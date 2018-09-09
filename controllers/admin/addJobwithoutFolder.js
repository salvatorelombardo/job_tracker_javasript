/* THIS FUNCTION IS OUTSIDE OF MODULE EXPORTS*/
function addUpdateJobsProc(res, data) {
    var i = 0,
        error, values = [],
        path, sql = "",
        foldername, sdata;
    // values = JSON.stringify(values);
    // console.log(values);
    // values = JSON.parse(values);
    // data = JSON.stringify(data);
    // data = JSON.parse(data);
    /* LOOPS THROUGH THE ARRAY OF OBJECTS AND CHECKS THE DATA AGAINST THE REGEX.  IF ERROR CHANGES STATUS TO ERROR OTHERWISE CHANGES STATUS TO SUCCESS. */
    while (i < data.elements.length) {
        if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
            data.elements[i].status = 'error';
            error = true;
        } else {
            //  VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL emailMENT LATER 
            values.push(data.elements[i].value);
        }
        i++;
    }
    if (error) {
        data.masterstatus = "errors";
        data = JSON.stringify(data);
        res.send(data);
    } else if (data.flag === 'add') {

        /* CREATE FOLDER NAME FOR ACCOUNT. THE FOLDER NAME IS THE ACCOUNT NAME PLUS A TIME STAMP TO MAKE IT UNIQUE */
        /* ANY SPACES IN A FOLDER NAME WILL BE REPLACED WITH A HYPHEN */
        foldername = values[0].split(" ").join("_");
        foldername = foldername.toLowerCase();
        foldername = foldername + Date.now();
        console.log(values[0]);
        /* ONCE I CREATE THE FOLDER NAME I ADDED IT TO THE VALUES ARRAY SO THE NAME WILL BE IN THE DATABASE */
        values.push(foldername);

        sdata = JSON.stringify(data);
        console.log(sdata);
        /* THIS ADDS THE VALUES TO THE DATABASE */
        values.push(foldername);

        sql = "SELECT folder FROM account WHERE id=?"
        // values = [req.body.acctId];
        queries.bindedSelect(sql, values, function (err, result) {
            console.log(result[0]);
            foldername = result[0].folder;
            fs.rename('./tmp/' + req.file.filename, './public/account_folders/' + foldername + "/" + req.file.filename + '.pdf', function (err) {
                if (err) {
                    res.send('filemoveerror');
                } else {
                    /* PUT INTO DATABASE */
                    sql = "INSERT INTO job (account_id, name, folder) VALUES (?, ?, ?)";

                    values = [req.body.acctId, filename, req.file.filename + '.pdf'];
                    console.log(values);
                    queries.bindedOther(sql, values, function (err, result) {
                        if (err) {
                            res.send('inserterror');
                        } else {
                            general.removeAllFiles('./tmp');
                            res.send('success');
                        }
                    });
                }
            });
        });
    }




    /* THIS METHOD IS BEING USED TO UPDATE THE ACCOUNT INFORMATION.  THE FOLDER IS NOT UPDATED OR ALLOWED TO BE UPDATED */
    else if (data.flag === 'update') {
        values.push(data.accountId);
        sql = "UPDATE job SET account_id=?, name=?, folder=?, WHERE id=?";
        queries.bindedOther(sql, values, function (err, result) {
            if (err) {
                data = {
                    masterstatus: "err",
                    msg: "There was an error updating the job."
                }
                data = JSON.stringify(data);
                res.send(data);
            } else {
                data = {
                    masterstatus: "success",
                    msg: "The job has been updated."
                }
                data = JSON.stringify(data);
                res.send(data);
            }
        });
    }

}