

var csrftoken='';
var sessionid = ''

describe('Login', () => {
   it('Go to url', () => {
            
      cy.visit('http://ta-crmapp.bdms.co.th/crmapps/index');
      cy.contains('- Get ready for GO LIVE "5 July 2017"');
      cy.get("input[name=username]").type('BPK_IMS_UM_CENTER');
      cy.get("input[name=password]").type('BPK_IMS_UM_CENTER');
      cy.get('[class="btn btn-info"]').click();
      

      cy.getCookie('csrftoken').then(csrfToken => {
			csrftoken = csrfToken.value
			cy.log('csrftoken = ' + csrfToken.value)
         cy.setCookie('csrftoken', csrftoken)

		})
      cy.getCookie('sessionid').then(sessionId => {
			sessionid = sessionId.value
			cy.log('sessionid = ' + sessionId.value)
         cy.setCookie('sessionid', sessionid)

		})

   })
   
   // cy.setCookie('csrftoken', csrftoken)

   it('Select Um Review Worklist', () => {
      cy.get('[class="panel panel-default BoxPanel"]').contains('UM Review Worklist').click();
   })
   
 })



//  describe('Login to OrangeHRM website', function () {
//    before(function () {
//        cy.visit('http://ta-crmapp.bdms.co.th/crmapps/index')
//        cy.fixture('testdata').then(function (testdata) {
//            this.testdata = testdata
//        })
//    })

//    it('Validate successful Login', function () {
//       cy.contains('- Get ready for GO LIVE "5 July 2017"');
//             cy.get("input[name=username]").type(this.testdata.username);
//             cy.get("input[name=password]").type(this.testdata.password);
//             cy.get('[class="btn btn-info"]').click();
//    })
// })

 