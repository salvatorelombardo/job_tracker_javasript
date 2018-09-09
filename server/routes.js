"use strict";
/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH SECTION. THIS IS JUST ONE WAY OF DOING IT I COULD HAVE DONE IT PER PAGE OR ANOTHER TYPE OF GROUPING */
	login = require('../controllers/admin/login'),
	home = require('../controllers/admin/home'),
	account = require('../controllers/admin/account'),
	contact = require('../controllers/admin/contact'),
	job = require('../controllers/admin/job'),
	logout = require('../controllers/admin/logout');




module.exports = function (app) {
	/* GET STATEMENTS */

	/* LOGIN */
	router.get('/', login.index);


	/*LOGOUT*/
	router.get('/logout', logout.logout);

	/* HOME */
	router.get('/home', home.index);

	/* ACCOUNTS */
	router.get('/add_account_form', account.addAccountForm); //NOTICE THIS IS A GET NOT A POST
	router.get('/update_account_form', account.updateAccountForm); //NOTICE THIS IS A GET NOT A POST WE ARE JUST LOADING THE FORM AND THE DROPDOWN BOX.
	router.get('/add_assets', account.addAccountAssetsForm);
	router.get('/view_delete_assets', account.viewDeleteAccountAssetsForm);

	/* CONTACTS */
	router.get('/add_contact_form', contact.addContactForm);
	router.get('/update_contact_form', contact.updateContactForm);
	router.get('/view_delete_contact', contact.viewDeleteContact);
	router.get('/getContactTable', contact.getContactTableTable);
	router.get('/manage_contacts_form', contact.manageContactsForm);

	// router.get('/manageContactAddAccount', contact.manageContactAddAccount);

	/* JOBS */
	router.get('/add_jobs_form', job.addJobsForm);
	router.get('/view_job_contact', job.viewJobContact);
	router.get('/add_job_note', job.addJobNote); // add job note get
	router.get('/view_update_delete_job_note', job.viewUpdateDeleteJobNote);

	router.get('/add_job_asset', job.addJobAsset); // add job asset get. will load add job asset and account list. loads jobs but not job list
	router.get('/view_job_asset', job.viewJobAsset); // view job asset table account list
	router.get('/add_job_hours', job.addJobHours); //add job hours
	router.get('/update_delete_job_hours', job.updateDeleteJobHours); // view update delete job hours 

	router.get('/print_job_invoice', job.printJobInvoice); // get print job invoice - acct

	/* POST STATEMENTS */
	router.post('/login', login.login);

	/* ACCOUNTS */
	router.post('/getAccount', account.getAccount); //THIS GETS THE ACCOUNT FORM WHICH IS POPULATED WITH THE ACCOUNT INFORMATION WHEN THE PROPER ACCOUNT IS SELECTED FROM THE DROPDOWN BOX.
	router.post('/addUpdateAccount', account.addUpdateAccount); //THIS EITHER ADDS OR UPDATES THE ACCOUNT

	router.post('/addAccountAsset', multer({
		dest: './tmp'
	}).single('file'), account.addAccountAsset);
	router.post('/getAssetTable', account.getAssetTable);
	router.post('/deleteAccountAsset', account.deleteAsset);

	/* CONTACT */
	router.post('/getContact', contact.getContact);
	router.post('/addUpdateContact', contact.addUpdateContact);
	// router.get('/getContactTable', contact.getContactTable);
	router.post('/deleteContactTable', contact.deleteContactTable);
	router.post('/getManageContactTable', contact.getManageContactTable);
	router.post('/getJobList', contact.getJobList);
	router.post('/addContactToJob', contact.addContactToJob);
	router.post('/deleteJobContact', contact.deleteJobContact); //sends job contact info toserver / deletes from db



	/* JOB */
	router.post('/getJob', job.getJob);
	router.post('/addUpdateJobs', job.addUpdateJobs);
	router.post('/addUpdateJobsProc', job.addUpdateJobsProc);
	router.post('/jobContactTablePost', job.jobContactTablePost);
	router.post('/jobContactTable', job.jobContactTable);
	router.post('/getAccountJob', job.getAccountJob);
	router.post('/submitJobNote', job.submitJobNote);
	router.post('/showUpdateJobForm', job.showUpdateJobForm);
	router.post('/jobNoteForm', job.jobNoteForm);
	router.post('/deleteJobNote', job.deleteJobNote);
	router.post('/updateJobNoteForm', job.updateJobNoteForm);
	router.post('/updateJobNote', job.updateJobNote);

	router.post('/getAccountJobAsset', job.getAccountJobAsset);

	// this post adds the job asset to the public job folder
	router.post('/addJobAssetPost', multer({
		dest: './tmp'
	}).single('file'), job.addJobAssetPost);

	router.post('/viewJobAssetPost', job.viewJobAssetPost); //shows job list for asset selection
	router.post('/jobAssetTable', job.jobAssetTable); //show job asset table
	router.post('/deleteJobAsset', job.deleteJobAsset); // deletes job asst on server

	router.post('/getJobHoursJob', job.getAccountJob); //loads job hours form and gets job list
	router.post('/addJobHoursPost', job.addJobHoursPost); //sends job hour info to server

	router.post('/updateDeleteJobHours', job.getAccountJob); // loads account job option list
	router.post('/updateDeleteJobHoursTable', job.jobHoursTable); // loads jobhours table
	router.post('/deleteJobHours', job.deleteJobHours); // delete job hours from db 
	router.post('/updateJobHoursForm', job.updateJobHours); //launches update job hour form
	router.post('/updateJobHoursPost', job.updateJobHoursPost); // updates job hours

	router.post('/printJobInvoice', job.getAccountJob) // get jobs for print job invoice
	router.post('/postInvoiceTable', job.postInvoiceTable) // get data for invoice and post table







	app.use(router);
}