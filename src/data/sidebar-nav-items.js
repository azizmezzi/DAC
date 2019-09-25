/* eslint-disable no-var */
export default function() {
  
  var pages = [
    {
      title: 'agTEK',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/main'
    },

    {
      title: 'Vaches & Groupes ',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/Vaches'
    },
    {
      title: 'Regimes & Aliments',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/regime'
    },
    {
      title: 'DAC',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/DAC'
    },

    {
      title: 'Statistique',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/Statistique'
    },
  /*
    {
      title: 'Log',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/Log'
    },
    */
    {
      title: 'Utilisateur',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/User'
    },
    /*
    {
      title: 'Errors',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/errors'
    },
    */
    {
      title: 'Profile',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 1,
      to: '/Profile'
    }
  ];

  // eslint-disable-next-line no-unused-vars
  var UserPages = [
    {
      title: 'Profile',
      htmlBefore: '<i class="material-icons"></i>',
      Role: 3,
      to: '/Profile'
    }
  ];

  return pages;
}
