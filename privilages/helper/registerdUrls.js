
module.exports={
  simple:[
    //admin
    {path:'/admin/',
    right:{create:true , read:false,update:true,deny:true}},
    {path:'/admin/load-users',
    right:{create:true , read:true,update:true,deny:true}},
  ],

 admin:[
  {path:'/auth/delete-user',
  right:{create:true , read:true,update:true},
  },
    {path:'/admin/load-users',
    right:{create:false , read:true,update:true},
    },
    {path:'/admin/set-new-password',
    right:{create:true , read:true,update:true},
    },
    {path:'/admin/delete-user',
    right:{create:true , read:true,update:true},
    },
    /* and so on... */
  ],
  warehouseManager:[
    {path:'/student/add-student',
    right:{create:true , read:true,update:true},
    },
    {path:'/student/delete-student',
    right:{create:true , read:true,update:true},
    },
    {path:'/student/edit-student',
    right:{create:true , read:true,update:true},
    },
    {path:'/student/test-result',
    right:{create:true , read:true,update:true},
    },
    /* and so on... */
  ],
  branchManager:[
    {
    path:'/teacher/',
    right:{create:true , read:true,update:true}
    },
    /* and so on... */
  ],
  salesPerson:[
     
    {path:'/admin/',
    right:{create:true , read:true,update:true},
    },
    {
    path:'/teacher/',
    right:{create:true , read:true,update:true}
    },
    {path:'/student/',
    right:{create:true , read:true,update:true},
    },
    /* and so on... */
  ],
}
