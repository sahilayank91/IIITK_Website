IIITKWebsite.controller('LoginController', ['$scope', '$state', '$window', '$rootScope', '$timeout', 'UIUtilityService', 'GroupService', 'ChildService', 'NotificationService', 'InstituteService', 'FollowClassService', 'PostsService', 'FeatureService','ProfileService', '$q', function ($scope, $state, $window, $rootScope, $timeout, UIUtilityService, GroupService, ChildService, NotificationService, InstituteService, FollowClassService, PostsService, FeatureService,ProfileService, $q) {


    console.log($scope.userdata);
    $scope.message = {};
    $scope.notifications = [];
    $scope.notificationCount = -1;
    $scope.GROUP_NAME_UI_LIMIT_SIDEBAR = 25; // For trimming group names in UI
    $scope.NOTIFICATION_MESSAGE_LIMIT = 60; // For trimming notification text in UI
    $scope.SIDEBAR_PROFILE_NAME_LIMIT = 12;
    $scope.SIDEBAR_NAME_LIMIT = 28;
    $scope.groups = [];
    $scope.mychildren = [];
    $scope.myinstitutes = [];

    $scope.showGallery = false;
    $scope.misc = {};
    $scope.misc.codeModalDataRequestPending = false;
    $scope.tourRequest = false;
    var intro =  introJs();
    $scope.logo = [];
    $scope.tourRequest = false;





    function groupMapper (group) {
        if (!group) return;

        if (group.type == UIUtilityService.getEnumsFor('groups').PRIVATE) {
            group.showSubgroup = true;
            group.expand = false;
        } else {
            group.showSubgroup = false;
            group.expand = 'NO_SUB_GROUP';
        }
        group.subGroups = [];

        if (group.group) {
            group._id = group.group;
        }

        return group;
    }

    function filterNullItems (item) {
        return item !== null;
    }

    $scope.init = function() {
        if ($scope.userdata.app_request === false && ($scope.userdata.role === 'org')) {
            $("#createFirstTimeVerificationModal").modal('show');
        } else if (($scope.userdata.role === 'st' || $scope.userdata.role === 'te' || $scope.userdata.role === 'pa' || $scope.userdata.role === 'ad') && $scope.userdata.app_request === false) {
            var parameters = {
                app_request: true,
            }

            FollowClassService.updateAppRequest(parameters)
                .then(function (data) {
                    $scope.startIntroTour();
                }).catch(function (error) {
                console.log(error);
            })
        }
    }

    $scope.startIntroTour = function(){
        if($scope.userdata.role === 'org' || $scope.userdata.role === 'ad'){
            intro.setOptions($scope.IntroInstitute);
        }else if($scope.userdata.role==='st'){
            intro.setOptions($scope.IntroStudent);
        }else if($scope.userdata.role==='pa'){
            intro.setOptions($scope.IntroParent);
        }else{
            intro.setOptions($scope.IntroTeacher);
        }
        intro.setOptions({overlayOpacity:0.2 ,highlightClass:'introjs-helper'});
        intro.start();
    }

    /**
     * For Groups
     */
    $scope.toggleSubGroupView = function ($event, group) {
        $event.preventDefault();
        if (group.showSubgroup) {
            if (group.expand == 'NO_SUB_GROUP') {
                return;
            } else {
                if (!group.expand) {
                    $scope.getSubGroups(group);
                }
                group.expand = !group.expand;
            }
        }
    };

    $scope.redirectToLink = function (url) {
        if('/app/' + url.slice(5) === url) {
            url = url.slice(5);
        } else {
            url = url.slice(1);
        }
        PostsService.getFileLink(url)
            .then(function (response) {
                $window.location.href = response.url;
                return;
            });
    };

    $scope.getHeadGroups = function () {
        return GroupService.getHeadGroups().then(function (data) {
            if (data.success) {
                $scope.groups = data.response.filter(filterNullItems).map(groupMapper);
                // Dump the entire group metadata for faster rendering
                UIUtilityService.setLocalStorageData('groups', JSON.stringify($scope.groups));
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "We are unable to fetch the groups. Please try again.",
                    type: "error"
                });
            }
        });
    };

    $scope.getSubGroups = function (group) {
        group.expand = 'IN_PROGRESS';
        GroupService.getSubGroups(group._id).then(function (data) {
            if (data.success) {
                if (data.response.length > 0) {
                    group.subGroups = data.response.filter(filterNullItems).map(groupMapper);
                    if (group.subGroups.length === 0) {
                        group.expand = 'NO_SUB_GROUP';
                    } else {
                        group.expand = true;
                    }
                } else {
                    group.expand = 'NO_SUB_GROUP';
                }

                // Dump the entire group metadata for faster rendering
                UIUtilityService.setLocalStorageData('groups', JSON.stringify($scope.groups));
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "We are unable to fetch subgroups. Please try again.",
                    type: "error"
                });
            }
        });
    };

    /**
     * For Notifications
     */
    $scope.getNotifications = function () {
        var parameters = {};

        NotificationService.getNotifications(parameters).then(function (response) {
            if (response.success) {
                $scope.notifications = response.items;
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "Notifications are not behaving properly. Please try again.",
                    type: "error"
                });
            }
        });
    };

    $scope.getNotificationCount = function () {
        var parameters = {};

        NotificationService.getNotificationCount().then(function (response) {
            if (response.success) {
                $scope.notificationCount = response.data;
            } else {
                // ToDo
            }
        });
    };

    $scope.clearNotifications = function () {
        $scope.notificationCount = -1;
    };

    $scope.reloadNotifications = function () {
        $scope.clearNotifications();
        $scope.getNotifications(true);
    };

    /**
     * For Invite Based Group
     */
    $scope.joinGroup = function () {
        $scope.misc.codeModalDataRequestPending = true;
        GroupService.joinGroups($scope.inviteCode).then(function (response) {
            if (response.success && response.data.group_joined) {
                // Now we have a bunch of conditions to check

                $timeout(function () {
                    return $scope.getHeadGroups()
                        .then(function () {
                            UIUtilityService.NOTIFICATION.show({
                                title: "Successfully JOINED Group",
                                type: "success"
                            });
                            $scope.misc.codeModalDataRequestPending = false;
                            $('#codeModal').modal('hide');
                            return true;
                        });
                }, 3000);
                // } else {
                //     if (response.data.require_approval && response.data.group_admin_notified) {
                //         UIUtilityService.NOTIFICATION.showForever({
                //             title: "Group request sent, Requires Approval.",
                //             content: "The admin of the group has been notified."
                //         });
                //     } else if (response.data.no_group_exists) {
                //         UIUtilityService.NOTIFICATION.show({
                //             title: "No such group found",
                //             content: "Please try again with the correct group code.",
                //             type: "error"
                //         });
                //     } else if (response.data.group_restricted) {
                //         UIUtilityService.NOTIFICATION.show({
                //             title: "Restricted group",
                //             content: "You cannot join this group.",
                //             type: "error"
                //         });
                //     } else if (!response.data.group_joined) {
                //         UIUtilityService.NOTIFICATION.show({
                //             title: "Well, this is embarrassing",
                //             content: "Unable to join the group.",
                //             type: "error"
                //         });
                //     }
                // }
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "Unable to join the group. Please try again.",
                    type: "error"
                });
                $('#codeModal').modal('hide');
                $scope.misc.codeModalDataRequestPending = false;
                return $q(function(resolve, reject) {
                    reject('Unable to JOIN Group');
                });
            }

        });
    };

    /**
     * For Add Children View
     */
    $scope.addAChild = function () {
        ChildService.addChild({code: $scope.inviteCode}).then(function (response) {
            if (response.success) {
                UIUtilityService.NOTIFICATION.show({
                    title: response.message,
                    type: "success"
                });
                $scope.getChildren();
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: response.message,
                    content: "We were not able to add your child. correct parent code? Please try again.",
                    type: "error"
                });
            }
        });
    };





    $scope.showCodeModal = function (type) {
        $scope.inviteCode = "";
        $scope.codeModalData = {};
        if (type === 'groupinvite') {
            $scope.codeModalData.heading = 'Join Group';
            $scope.codeModalData.inputplaceholder = 'Enter Group Code';
            $scope.codeModalData.submitHandler = $scope.joinGroup;
            $scope.codeModalData.submitbutton = "Join";
        } else if (type === 'addachild') {
            $scope.codeModalData.heading = 'Add a Child';
            $scope.codeModalData.inputplaceholder = 'Enter Parent Code';
            $scope.codeModalData.submitHandler = $scope.addAChild;
            $scope.codeModalData.submitbutton = "Add Child";
        }
        $('#codeModal').modal('show');
    };

    $scope.codeModalSubmitHandler = function () {
        $scope.codeModalData.submitHandler();
    };

    /**
     * For Get Children
     */
    $scope.getChildren = function () {
        ChildService.getChildren().then(function (response) {
            if (response.success) {
                $scope.mychildren = response.data;
                // Dump the entire group metadata for faster rendering
                UIUtilityService.setLocalStorageData('mychildren', JSON.stringify($scope.mychildren));
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "Unable to fetch your children. Please try again.",
                    type: "error"
                });
            }
        });
    };

    /**
     * For Get Institutes
     */
    $scope.getInstitutes = function () {
        InstituteService.getInstitutes().then(function (response) {
            if (response.success) {
                $scope.myinstitutes = response.data;
                // Dump the entire group metadata for faster rendering
                UIUtilityService.setLocalStorageData('myinstitutes', JSON.stringify($scope.myinstitutes));
            } else {
                UIUtilityService.NOTIFICATION.show({
                    title: "Well, this is embarrassing",
                    content: "Unable to fetch your institutes. Please try again.",
                    type: "error"
                });
            }
        });
    };

    $scope.selectAndOpenGroup = function (group) {
        $state.go('group.list', {
            id: group._id,
            group: JSON.stringify(group)
        });
    };

    // Load from local storage initially and make a parallel call to service
    function loadSidebarData () {
        // Load groups if user has access
        if (UIUtilityService.isAccessGranted('groups', UIUtilityService.getUserData())) {
            $scope.groups = UIUtilityService.getLocalStorageData('groups') ?
                JSON.parse(UIUtilityService.getLocalStorageData('groups')) : [];
            $scope.getHeadGroups();
        }

        // Load child if user has access
        if (UIUtilityService.isAccessGranted('children', UIUtilityService.getUserData())) {
            $scope.mychildren = UIUtilityService.getLocalStorageData('mychildren') ?
                JSON.parse(UIUtilityService.getLocalStorageData('mychildren')) : [];
            $scope.getChildren();
        }

        // Load institutes if user has access
        if (UIUtilityService.isAccessGranted('institutes', UIUtilityService.getUserData())) {
            $scope.myinstitutes = UIUtilityService.getLocalStorageData('myinstitutes') ?
                JSON.parse(UIUtilityService.getLocalStorageData('myinstitutes')) : [];
            $scope.getInstitutes();
        }

        if(UIUtilityService.getUserData().org_type === 'Private'){
            $scope.showGallery = true;
        }

        $scope.getNotificationCount();
        $scope.getNotifications();
    }

    $scope.createIssue = function (issue) {
        var parameters = {
            type: issue.type,
            description: issue.description,
            name: $scope.userdata.firstname + " " + $scope.userdata.lastname
        };

        FollowClassService.createIssue(parameters)
            .then(function (response) {
                if (response.success) {
                    UIUtilityService.NOTIFICATION.show({
                        title: "Thanks for your help.",
                        content: "An issue has been created. Our team will reach out to you soon."
                    });
                    $state.go('index');
                } else {
                    UIUtilityService.NOTIFICATION.show({
                        title: "Well, this is embarrassing",
                        content: "We are unable to create an issue. Please try again.",
                        type: "error"
                    });
                }
            });
    };

    $scope.$on('$stateChangeSuccess', function () {
        if (!$rootScope.alreadyLoadedSidebar) {
            loadSidebarData();
            $rootScope.alreadyLoadedSidebar = true;
        }
    });

    $scope.$on('loadSidebarGroups', function () {
        $scope.getHeadGroups();
    });

    $scope.$on('loadSidebarInstitutes', function () {
        $scope.getInstitutes();
    });

    $scope.$on('loadSidebarChildren', function () {
        $scope.getChildren();
    });

    $scope.$on('updateProfileData', function () {
        $scope.userdata = UIUtilityService.getUserData();
    });

    $scope.$on('groupDeleted', function () {
        $scope.getHeadGroups();
    });


    $scope.IntroInstitute = {
        steps:[
            {
                element:document.querySelector('#step1'),
                intro: "Update and Manage your Account Information from Here..",
                position: 'right'
            },
            {
                element: '#step2',
                intro: "Get in touch with all of the Posts in your Groups at a Single Place.",
                position: 'right'
            },
            {
                element: '#step3',
                intro: 'Add as many Institutes you want to add and grow your Organisation.',
                position: 'top-right'
            },
            {
                element: '#step4',
                intro: "A Hassle free solution for the problem of Exam Creation. Launch and get Results in Real Time with Analysis of Each student",
                position: 'bottom'
            },
            {
                element: '#step5',
                intro: 'Create Fees and Send Reminders regarding Fee Dates, Dues or Submission to the Parents and students whenever you want',
                position: 'right'
            },
            {
                element:'#activity',
                intro:'Get Details about the Activity of Groups and Usage of the Application here.',
                position:'right'
            },
            {
                element:'#step6',
                intro: 'A solution to the worries about the child. Gain access to realtime Bus tracking with GPS to be aware of your Child Whereabouts',
                position:'right'
            },
            {
                element:'#faq',
                intro: 'Whenever you have any doubts , come to this place we have taken care of most Frequent questions asked by users.',
                position:'right'
            }
        ],
        showStepNumbers: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc:true,
        nextLabel: 'Next',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };

    $scope.IntroStudent = {
        steps:[
            {
                element:document.querySelector('#step1'),
                intro: "Update and Manage your Account Information from Here..",
                position: 'right'
            },
            {
                element: '#step2',
                intro: "Get in touch with all of the Posts in your Groups at a Single Place.",
                position: 'right'
            },
            {
                element:'#joingroup',
                intro:'Click here to Join your Group and get all Activities at one place.',
                position: 'right'
            },
            {
                element:'#assignment',
                intro:'Get your Assignment and Submit it here.',
                position:'right'
            },
            {
                element: '#step4',
                intro: "Check and give Exams you have been assigned to. Get Analysis as soon as you complete the Exam",
                position: 'bottom'
            },
            {
                element:'#gradecard',
                intro:'Check Results of Assignments and Exams you gave with an Efficient Analysis to Improve your performance.',
                position:'right'
            },
            {
                element:'#feepayment',
                intro:'Get your Fee Payment Status here',
                position:'bottom'

            },
            {
                element:'#faq',
                intro: 'Whenever you have any doubts , come to this place we have taken care of most Frequent questions asked by users.',
                position:'right'
            }
        ],
        showStepNumbers: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc:true,
        nextLabel: 'Next',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };

    $scope.IntroParent = {
        steps:[
            {
                element:document.querySelector('#step1'),
                intro: "Update and Manage your Account Information from Here..",
                position: 'right'
            },
            {
                element: '#step2',
                intro: "Get in touch with all of the Posts in your Groups at a Single Place.",
                position: 'right'
            },
            {
                element:'#children',
                intro:'Get details about your child Attendance, GradeCards, Assignment Submission , all at one place.',
                position: 'right'
            },
            {
                element:'#feepayment',
                intro:'Get the Fee Payment Status of your child here',
                position:'bottom'

            },
            {
                element:'#faq',
                intro: 'Whenever you have any doubts , come to this place we have taken care of most Frequent questions asked by users.',
                position:'right'
            }
        ],
        showStepNumbers: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc:true,
        nextLabel: 'Next',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };


    $scope.IntroTeacher = {
        steps:[
            {
                element:document.querySelector('#step1'),
                intro: "Update and Manage your Account Information from Here..",
                position: 'right'
            },
            {
                element: '#step2',
                intro: "Get in touch with all of the Posts in your Groups at a Single Place.",
                position: 'right'
            },
            {
                element:'#joingroup',
                intro:'Click here to Join your Group and get all Activities at one place.',
                position: 'right'
            },
            {
                element: '#step4',
                intro: "Check Exams you have conducted. Get Analysis as soon as you complete the Exam",
                position: 'bottom'
            },
            {
                element:'#myactivity',
                intro:'Check your Activities here',
                position:'right'
            },
            {
                element:'#faq',
                intro: 'Whenever you have any doubts , come to this place we have taken care of most Frequent questions asked by users.',
                position:'right'
            }
        ],
        showStepNumbers: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc:true,
        nextLabel: 'Next',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };


    // intro.setOptions($scope.IntroInstitute);

    $scope.startSiteTour = function() {
        if($scope.userdata.app_request === false){
            //TODO show modal here
            $("#createFirstTimeVerificationModal").show();
        }else if($scope.tourRequest ===true){
            intro.start();
        }else{

        }

    };

// Ensures that the tour is closed once it is finished
    intro.onexit (function(targetElement) {


    });
    intro.onchange (function(targetElement) {
        // document.getElementById(targetElement.id).css("opacity",0);
        jQuery('.introjs-helperNumberLayer').css({
            position:'static',
            left: '0px',
        });


    });

    intro.oncomplete (function(targetElement) {
        jQuery('.introjs-helperNumberLayer').css({
            position:'static',
            left: '0px',
        });

    });



    intro.onafterchange(function(targetElement){
        jQuery('.introjs-helperNumberLayer').css({
            position:'static',
            left: '0px',
        });
    })


    $scope.denyAppRequest = function(){
        $scope.tourRequest = true;
        var parameters = {
            app_request:true,
        }
        $("#createFirstTimeVerificationModal").modal('hide');
        alert('You can still Ask for Creating your Application if you want by going into the Manage Account Section...');
        FollowClassService.updateAppRequest(parameters).then(function(data){

            if( $scope.userdata.role==='org' || $scope.userdata.role === 'ad' ){
                intro.setOptions($scope.IntroInstitute);
            }else if($scope.userdata.role==='st'){
                intro.setOptions($scope.IntroStudent);
            }else if($scope.userdata.role==='pa'){
                intro.setOptions($scope.IntroParent);
            }else{
                intro.setOptions($scope.IntroTeacher);
            }
            intro.setOptions({  overlayOpacity:0.2 ,highlightClass:'introjs-helper'});

            intro.start();
        }).catch(function(error){
            console.log(error);
            UIUtilityService.NOTIFICATION.show({
                title: "App Link Activation Failed",
                content: "We regret the inconvenience. Please try again.",
                type: "error"
            });
        })


    }

    $scope.createAppRequest = function(){
        if($scope.userdata.app_request === false){
            $("#createFirstTimeVerificationModal").modal('show');
        }

    }


    $scope.selectFiles = function (file, $invalidFiles, type) {
        if (!file || file.length === 0) {
            UIUtilityService.NOTIFICATION.show({
                title: "Please Select an Image File",
                content: "We regret the inconvenience. Please try again.",
                type: "error"
            });
            return;
        }
        $scope.logo = file;
        console.log($scope.logo);

    };



    $scope.uploadProfilePic = function () {
        if (!$scope.logo || $scope.logo.hasOwnProperty('$error')) {
            UIUtilityService.NOTIFICATION.show({
                title: "Please select a image file!",
                content: "error uploading profile pic!",
                type: "error"
            });
            $scope.logo.updateInProgress = false;
            $scope.logo.newProfilePic = "";
        } else {
            ProfileService.uploadProfilePic($scope.logo)
                .then(function (response) {
                    if (response.data.success) {
                        var userdata = UIUtilityService.getUserData();
                        delete userdata.profile_pic;
                        userdata.profile_pic = response.data.data;
                        $scope.userProfile = userdata;
                        UIUtilityService.setUserData(userdata);

                        // Broadcast ImageChange
                        $rootScope.$broadcast('updateProfileData');

                        // Clear profilePic
                        $scope.logo.updateInProgress = false;
                        $scope.logo.newProfilePic = "";
                    } else {
                        // Clear profilePic
                        $scope.logo.updateInProgress = false;
                        $scope.logo.newProfilePic = "";
                        UIUtilityService.NOTIFICATION.show({
                            title: "Profile Pic update failed",
                            content: "We regret the inconvenience. Please try again.",
                            type: "error"
                        });
                    }
                }).then(function(){
                var parameters = {
                    app_request:true,
                }

                FollowClassService.updateAppRequest(parameters).then(function(data){
                    $("#createFirstTimeVerificationModal").modal('hide');

                    if($scope.userdata.role === 'org' || $scope.userdata.role === 'ad'){
                        intro.setOptions($scope.IntroInstitute);
                    }else if($scope.userdata.role==='st'){
                        intro.setOptions($scope.IntroStudent);
                    }else if($scope.userdata.role==='pa'){
                        intro.setOptions($scope.IntroParent);
                    }else{
                        intro.setOptions($scope.IntroTeacher);
                    }
                    intro.setOptions({  overlayOpacity:0.2 ,highlightClass:'introjs-helper'});
                    intro.start();
                }).catch(function(error){
                    console.log(error);
                    UIUtilityService.NOTIFICATION.show({
                        title: "App Link Activation Failed",
                        content: "We regret the inconvenience. Please try again.",
                        type: "error"
                    });
                })


            })
                .catch(function (error) {
                    // Clear profilePic
                    $scope.logo.updateInProgress = false;
                    $scope.logo.newProfilePic = "";
                    UIUtilityService.NOTIFICATION.show({
                        title: "Profile Pic update failed",
                        content: "We regret the inconvenience. Please try again.",
                        type: "error"
                    });
                });
        }

    };

}]);
