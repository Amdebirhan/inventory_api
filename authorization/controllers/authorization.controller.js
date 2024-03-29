const Joi = require("joi");
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../../inventory/helpers/mailler");
const User = require("../../inventory/users/models/users.model");
const { generateJwt } = require("../../inventory/helpers/generateJwt");
const token = require("../middlewares/decodeToken");
const roles = require("../../inventory/privilages/helper/roles");
const rolesAndPrivilages = require("../middlewares/SignupRoleAndPrivilages");
const organizationalProfile = require("../../inventory/organizational_profile/models/organizationalProfile.models");
const crypto = require("crypto");
const clientURL = require("../../inventory/common/config/env.config").clientURL;
//Validate user schema
const userSchema = Joi.object()
  .keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(4),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  })
  .unknown();

exports.Signup = async (req, res) => {
  console.log(req.body);
  try {
    req.body.roleName = roles.ADMIN;
    req.body.roleId = await rolesAndPrivilages.assignRole(req.body, res);
    delete req.body.roleName;
    req.body.privilages = await rolesAndPrivilages.assignPrivilages(
      req.body.roleId
    );
    orgProfile = {
      contact_email: req.body.email,
    };
    console.log(orgProfile);
    req.body.organizationalId = await organizationalProfile
      .createOrganizationalProfile(orgProfile)
      .then((result) => {
        return result._id;
      });

    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    //Check if the email has been already registered.
    var user = await User.findOne({
      email: result.value.email,
    });
    if (user) {
      if (!user.active) {
        var emailToken = await User.findOne({
          email: result.value.email,
          emailTokenExpires: { $gt: Date.now() },
        });
        if (emailToken !== null) {
          return res
            .status(400)
            .send({
              message:
                "We already send a verification code through your Email please check your email",
            });
        } else {
          User.findOneAndRemove({ _id: user._id }, (err) => {
            if (err) {
              req.flash("error", err);
              //return res.redirect("/user/edit");
            }
            //return res.redirect("/shop/coffee");
          });
        }
      } else {
        console.log("error");
        res.status(400).send({ message: "sfdfsdf" });
      }
    }
    const hash = await User.hashPassword(result.value.password);

    //remove the confirmPassword field from the result as we dont need to save this in the db.
    delete result.value.confirmPassword;
    result.value.password = hash;
    let code = Math.floor(100000 + Math.random() * 900000); //Generate random 6 digit code.
    let expiry = Date.now() + 60 * 1000 * 15; //Set expiry 15 mins ahead from now
    const sendCode = await sendEmail(
      result.value.email,
      "verification code",
      { link: code },
      "../helpers/templates/verificationcode.handlebars"
    );
    if (sendCode.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send verification email.",
      });
    }
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);

    const newUser = new User(result.value);
    await newUser.save();

    return res.status(200).json({
      success: true,
      user: result.value.email,
      message:
        "Registration Success We send a verification code through your Email",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: "please enter your email adress",
      });
    } else if (!password) {
      return res.status(400).json({
        error: true,
        message: "please enter your password",
      });
    } else if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "please enter your email and password",
      });
    } else {
      //find a user with the provided email
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "account not found",
        });
      }
      //through error if the account is not activated with the code sent by the email
      if (!user.active) {
        res.status(400).json({
          error: true,
          message: "you must verify your email to activate your account",
        });
      }
      //through error if password is incorrect
      const isValid = await User.comparePasswords(password, user.password);
      if (!isValid) {
        return res.status(400).json({
          error: "Incorrect Password",
          message: "Incorrect password",
        });
      }

      const { error, token } = await generateJwt(
        user.email,
        user._id,
        user.organizationalId
      );
      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access token. Please try again later",
        });
      }
      user.accessToken = token;
      await user.save();

      //successfully login
      return res.send({
        success: true,
        token: user.accessToken,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error("Login error");
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
};

exports.activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({
        error: true,
        message: "please make a valid request",
      });
    }

    const user = await User.findOne({
      email: email,
      emailToken: code,
      emailTokenExpires: { $gt: Date.now() }, //to check if the code is expires
    });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "invalid detalis",
      });
    } else {
      if (user.active) {
        return res.status(400).json({
          error: true,
          message: "Account already activated",
        });
      }
      user.emailToken = "";
      user.emailTokenExpires = null;
      user.active = true;

      await user.save();
      return res.status(200).json({
        success: true,
        message: "account activated",
      });
    }
  } catch (error) {
    console.error("activation error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        status: 400,
        error: true,
        message: "please inter your email account",
      });
    }
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.send({
        success: true,
        message: "wrong email adress.",
      });
    }

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await User.hashPassword(resetToken);

    const link = `${clientURL}?token=${resetToken}&id=${user._id}&orgId=${user.organizationalId}`;
    let Response = await sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.firstName, link: link },
      "../../inventory/helpers/templates/resetPassword.handlebars"
    );

    if (Response.error) {
      return res.status(500).json({
        error: true,
        message: "could't send email please try again.",
      });
    }
    let expiry = Date.now() + 60 * 1000 * 15; //give 15 min expiry time for the code
    user.resetPasswordToken = hash;
    user.resetPasswordExpires = expiry;

    await user.save();

    return [401, { message: "sfdfsdf" }];
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  console.log(req.body);
  try {
    const token = req.params.token;
    const userId = req.params.id;
    const orgId = req.params.orgId;
    const { newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword || !userId) {
      return res.status(403).json({
        error: true,
        message: "pleace provide all mandatory fields",
      });
    }

    const hash = await User.hashPassword(req.body.token);
    const user = await User.findOne({
      _id: userId,
      organizationalId: orgId,
      resetPasswordToken: hash,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.send({
        error: true,
        message: "password reset token has expired",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "password did't match.",
      });
    }
    const hashedpassword = await User.hashPassword(req.body.newPassword);
    user.password = hashedpassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = "";
    await user.save();

    // return res.send({
    //     success:true,
    //     message:"password has been changed",
    // })

    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.firstName,
      },
      "../../helpers/templates/successresetPassword.handlebars"
    );
  } catch (error) {
    console.error("reset-password-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const decoded = await token.decodeToken(req.headers.authorization);
    console.log(decoded);
    const user = await User.findOne({
      _id: decoded.id,
    });
    if (!user) {
      return [401, { message: "Invalid authorization token" }];
    }
    return res.status(200).json({
      error: false,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
};

exports.logout = async (req, res) => {
  try {
    const decoded = await token.decodeToken(req.headers.authorization);
    const { id } = decoded.id;

    let user = await User.findOne({ _id: id });

    user.accessToken = "";

    await user.save();

    return res.send({
      success: true,
      isAuthenticated: false,
      message: "User Logged out",
    });
  } catch (error) {
    console.error("user-logout-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
