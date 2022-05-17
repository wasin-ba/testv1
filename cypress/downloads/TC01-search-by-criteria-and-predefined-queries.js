import ScreenClass from '../../../../pageObjects/common/screen-class.js'
import CRMCookiesClass from '../../../../pageObjects/crm/common/crm-cookies-class.js'
import UserRoleClass from '../../../../pageObjects/crm/common/user-role-class.js'
import CommunicationClass from '../../../../pageObjects/crm/web/communications/communications-class.js'

var latestVersion = ''
var qaURL = ''
var username = ''
var password = ''
var userRole = ''
var csrftoken = ''
var sessionid = ''

describe('Communications - Search by criteria and predefined queries', () => {
	before(() => {
		/* check CRM version */
		cy.fixture('/crm/common/check-crm-version.json').then(latestCRMVersion => {
			latestVersion = latestCRMVersion['qa_environment'].latestVersion
		})

		/* get QA URL from data test file */
		cy.fixture('/crm/common/environment/environment.json').then(
			dataTestEnvironment => {
				qaURL = dataTestEnvironment['qa_environment'].url
			}
		)
		/* get username, password from data test file */
		cy.fixture('/crm/common/accounts/user-password.json').then(
			dataTestUserLogin => {
				username = dataTestUserLogin['userBHQAlarmCenter'].username
				password = dataTestUserLogin['userBHQAlarmCenter'].password
				userRole = dataTestUserLogin['userBHQAlarmCenter'].role
			}
		)
	})

	after(() => {
		/* clear all cookies after logout */
		cy.clearCookies()
	})

	it('Login to CRM Web Application', () => {
		/* open CRM web application */
		cy.visit(qaURL)
		cy.log('=== check after login ===')
		cy.title().should('equal', latestVersion) // check CRM version
		cy.location('protocol').should('equal', 'https:')
		cy.url().should('contain', 'qa2-crmapp.bdms.co.th/crmapps/index')
		/* login */
		cy.get('input[name="username"]').type(username)
		cy.get('input[name="password"]').type(password)
		cy.get('button[type="submit"]').contains('Submit').click()
		/* get cookies */
		cy.getCookie('csrftoken').then(csrfToken => {
			csrftoken = csrfToken.value
			cy.log('csrftoken = ' + csrfToken.value)
		})
		cy.getCookie('sessionid').then(sessionId => {
			sessionid = sessionId.value
			cy.log('sessionid = ' + sessionId.value)
		})
		cy.log('=== Check role of user login ===')
		UserRoleClass.checkRoleOfUserLogin(userRole)
	})

	it('Click menu Communications', () => {
		/* set cookies */
		CRMCookiesClass.setCoolkiesAfterLogin(csrftoken, sessionid)
		cy.log('=== check CRM version ===')
		cy.contains('CRM Application Version: 19.21.441')
		/* click menu Communications */
		cy.get('a[href="/crmapps/communications"]').click()
		/* check progress bar "Please Wait" is visible */
		cy.get('div[class="modal-dialog modal-m"]', { timeout: 3000 }).should(
			'be.visible'
		)
		/* check that dropdown list Predefined Queries should show on screen */
		cy.get('select[name="query_id"]', { timeout: 3000 }).should('be.visible') // wait for <= 10 sec. until this element visible
		/* check that search criteria "My Team's Communication" ,"My Communications" should show on screen */
		cy.contains("My Team's Communications")
		/* check that search criteria by column should show on screen */
		cy.contains('Email From')
	})

	// it('Outlook View - Search by default search criteria', () => {
	// 	/* set cookies */
	// 	CRMCookiesClass.setCoolkiesAfterLogin(csrftoken, sessionid)
	// 	ScreenClass.waitingUntilTheScreenLoadingCompleted(10000)
	// 	/* check search icon button */
	// 	cy.get('button[id="btnSearch"]', { timeout: 3000 }).should('be.visible')
	// 	/* click search icon button */
	// 	cy.get('button[id="btnSearch"]').click()
	// 	/* check progress bar "Please Wait" is visible */
	// 	cy.get('div[class="modal-dialog modal-m"]', { timeout: 3000 }).should(
	// 		'be.visible'
	// 	)
	// 	ScreenClass.waitingUntilTheScreenLoadingCompleted(40000)
	// })

	it('Outlook View - Search by My Team Communication and Email From and all Predefined Queries', () => {
		/* set cookies */
		CRMCookiesClass.setCoolkiesAfterLogin(csrftoken, sessionid)
		ScreenClass.waitingUntilTheScreenLoadingCompleted(10000)
		/* click and select search by criteria "My Team's Communications" */
		cy.get('div[class="row commu-popup"] > div > div')
			.find('button[id="ddSearch"]')
			.contains("My Team's Communications")
			.click()
		cy.get('li > a').contains("My Team's Communications").click()
		ScreenClass.waitingUntilTheScreenLoadingCompleted(10000)
		/* click and select search by criteria "Email From" */
		cy.get('div[class="input-group-btn search-col"]')
			.find('button[id="ddSearchCol"]')
			.contains('Email From')
			.click()
		cy.get('ul[class="dropdown-menu"] > li > a').contains('Email From').click()
		/* select all predefined queries of user login */
		cy.fixture('/crm/web/communications/predefined-queries.json').then(
			dataTest => {
				CommunicationClass.searchByPredefinedQueries(
					'outlook',
					dataTest['roleBHQALARMCENTERSearchByPredefinedQueries']
				)
			}
		)
	})

	// it('Outlook View - Search by My Team Communication and Email From and Predefined Queries 001_1 Email Inbound - Not Started', () => {
	// 	cy.log('Under constrution')
	// 	// Email From = insurance@princhealth.com, Not Started
	// 	//
	// })

	// it('Logout', () => {
	// 	/* set cookies */
	// 	CRMCookiesClass.setCoolkiesAfterLogin(csrftoken, sessionid)
	// 	/* click logout button */
	// 	cy.get('a[href="/crmapps/logout"]').first().click()
	// })
})
