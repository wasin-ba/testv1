export default class CRMCookiesClass {
	static setCoolkiesAfterLogin(csrftoken, sessionid) {
		cy.setCookie('csrftoken', csrftoken)
		cy.setCookie('sessionid', sessionid)
	}
	static setCsrftoken(csrftoken) {
		cy.setCookie('csrftoken', csrftoken)
	}
	static setDefaultCookies(experimentation_subject_id, csrftoken, sessionid) {
		cy.setCookie('experimentation_subject_id', experimentation_subject_id)
		cy.setCookie('csrftoken', csrftoken)
		cy.setCookie('sessionid', sessionid)
	}
}
