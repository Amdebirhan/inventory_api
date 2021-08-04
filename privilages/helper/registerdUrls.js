module.exports = {
    simple:{
       path: '/users/',
       name :["login"],
    },
    auth:{
        //admin
        '/admin/': ['load-users' , 'set-new-password','delete-user'],
        '/teacher/':["add-teacher","delete-teacher","edit-teacher"],
        '/student/':["add-student","delete-student","edit-student","test-result"],
        
        //user
        '/test/':["view-test","submit-test"],
        '/profile/': ['change-username', 'update-profile-data',  'set-new-password', 'upload-pic', 'update-social-links'],
        '/teacher/':['load-teacher'],
        '/student/':['load-student']

    }
}