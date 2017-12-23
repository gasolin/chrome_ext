//injects various information on the page
var body = function(){
    var url = document.location.href;
    var isOnGitHub = url.indexOf('://github.com') != -1 && url.indexOf('://github.com') < 15;

    if(!isOnGitHub){
        setThumbnail('');
    } else {
        // isOnUserProfile
        if (url.match(/.+\/.+\/?/gi) != null && document.getElementById("report-block-modal")) {
            addButtonToUserPage();
        }
        // isOnIssuePage
        if (url.indexOf('/pull/') != -1 || url.indexOf('/issue/') != -1 || url.indexOf('/issues/') != -1) {
            addButtonToIssuePage();
            addBountyInfoToIssuePage(url);
            injectGetBountyAmount();
        } else if (url.match(/.+\/.+\/.+\/.+\/?/gi) != null) { // isOnRepo
            var repoUrl = document.location.href.split('issues')[0].split('pulls')[0];
            injectGetNumberBounties(repoUrl);
        } else if (url.indexOf('/issues') != -1) { // isOnIssuesPage
            injectGetAllBountiesOnIssuesPage();
        } else if (url.indexOf('boards') != -1) { // isOnIssueBoard
            injectGetAllBountiesOnIssueBoard();
        } else {
            injectGetTotalBounties();
        }
    }
}

var url = window.location.href;
var hasRun = false;

setInterval(function() {
    if (url !== window.location.href || !hasRun) {
        url = window.location.href;
        body();
    }
    hasRun = true;
}, 1000);


