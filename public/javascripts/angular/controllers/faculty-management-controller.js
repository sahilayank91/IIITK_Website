IIITKWebsite.controller('FacultyController', ['$scope','UserService','UIUtilityService','FacultyService', 'Upload', '$timeout','$window', function ($scope,UserService,UIUtilityService,FacultyService, Upload, $timeout,$window) {
    $scope.email = "";
    $scope.branch = "";
    $scope.education = "";
    $scope.firstname ="";
    $scope.lastname ="";
    $scope.gender = "";
    $scope.role ="";
    $scope.phone = "";
    $scope.about = "";
    $scope.profilePic = "";
    $scope.post = "";

    $scope.allfaculties = true;
    $scope.addnewfaculty = false;
    $scope.updatefacultypage = false;

    $scope.addFacultyClicked = function () {
        $scope.allfaculties = false;
        $scope.addnewfaculty = true;
        $scope.updatefacultypage = false;
        $scope.email = "";
        $scope.branch = "";
        $scope.education = "";
        $scope.firstname ="";
        $scope.lastname ="";
        $scope.gender = "";
        $scope.role ="";
        $scope.phone = "";
        $scope.about = "";
        $scope.profilePic = "";
        $scope.post = "";
    };

    $scope.goToAllFaculty = function () {
        $scope.allfaculties = true;
        $scope.addnewfaculty = false;
        $scope.updatefacultypage = false;

        $scope.faculty=[];
        $scope.getFacultyList();
    };

    $scope.updateFacultyClicked = function () {
        $scope.allfaculties = false;
        $scope.addnewfaculty = false;
        $scope.updatefacultypage = true;
    };



    $scope.validateDetails = function(){

    };


    $scope.addFaculty = function(){
        $scope.validateDetails();

        var parameters = {
            email:$scope.email,
            firstname:$scope.firstname,
            lastname:$scope.lastname,
            education:$scope.education,
            branch:$scope.branch,
            gender:$scope.gender,
            phone:$scope.phone,
            role:$scope.role,
            type:"Faculty",
            about:$scope.about,
            post:$scope.post,
            profilePic:$scope.profilePic
        };
        FacultyService.registerFaculty(parameters)
            .then(function(data){
                if(data.data.success){
                    $scope.goToAllFaculty();
                    UIUtilityService.NOTIFICATION.show({
                        title: "Success",
                        content: "Faculty Registered Successfully",
                        type: "success"
                    });
                }

            }).catch(function(error){
            console.log("Error: ",error);
        })
    };


    $scope.faculty=[];
    $scope.getFacultyList = function(){
        FacultyService.getFacultyList()
            .then(function(result){
                 console.log(result.success);
                for(var i=0;i<result.data.length;i++){
                     console.log(result.data[i]);
                    var param = {};
                    param.index  = i;
                    param.id = result.data[i]._id;
                    param.firstname = result.data[i].firstname;
                    param.lastname = result.data[i].lastname;
                    param.name = result.data[i].firstname +" " + result.data[i].lastname;
                    param.contact = result.data[i].phone
                    param.about = result.data[i].about;
                    param.branch = result.data[i].branch;
                    param.education = result.data[i].education;
                    param.email = result.data[i].email;
                    param.about  = result.data[i].about;
                    param.education = result.data[i].education;
                    param.phone = result.data[i].phone;
                    param.role = result.data[i].role;
                    param.post = result.data[i].post;
                    $scope.faculty.push(param);
                }

                console.log("Faculty: ",$scope.faculty);

            });


    };


    $scope.getFacultyList();


$scope.deleteFaculty = function(faculty_id){
    var param ={};
    param.id = faculty_id;
    FacultyService.deleteFaculty(param)
        .then(function(data){
            $scope.faculty = [];
            $scope.getFacultyList();
            if(data){
                UIUtilityService.NOTIFICATION.show({
                    title: "Success",
                    content: "Faculty Deleted Successfully",
                    type: "success"
                });
            }
        }).catch(function(err){
        UIUtilityService.NOTIFICATION.show({
            title: "Failed",
            content: "Error in Deleting Faculty. Please Try Again",
            type: "error"
        });
    })

};

$scope.showUpdateFacultyDialog = function(index){
    $scope.index  = index;
    $scope.firstname = $scope.faculty[index].firstname;
    $scope.lastname = $scope.faculty[index].lastname;
    $scope.email= $scope.faculty[index].email;
    $scope.name = $scope.firstname + " " + $scope.lastname;
    $scope.education = $scope.faculty[index].education;
    $scope.phone = $scope.faculty[index].phone;
    $scope.role = $scope.faculty[index].role;
    $scope.branch = $scope.faculty[index].branch;
    $scope.gender = $scope.faculty[index].gender;
    $scope.about = $scope.faculty[index].about;
    $scope.id = $scope.faculty[index].id;
    $scope.post = $scope.faculty[index].post;
};

$scope.updateFaculty = function(){
    var parameters = {
        id:$scope.id,
        email:$scope.email,
        firstname:$scope.firstname,
        lastname:$scope.lastname,
        education:$scope.education,
        branch:$scope.branch,
        gender:$scope.gender,
        phone:$scope.phone,
        role:$scope.role,
        type:"Faculty",
        post:$scope.post,
        about:$scope.about
    };
    FacultyService.updateFaculty(parameters)
        .then(function(data){
            if(data){
                $scope.goToAllFaculty();
                console.log(data);

            }else{
            }
        }).catch(function(err){
        UIUtilityService.NOTIFICATION.show({
            title: "Failed",
            content: "Error in Updating Faculty. Please Try Again",
            type: "error"
        });

        })
};

    $scope.selectFiles = function (files, $invalidFiles, type) {

        if (!files || files.length === 0) return;


        $scope.uploadProfilePic(files, type);
    };



    $scope.uploadProfilePic = function (file, type) {
        console.log("Inside upload files");






    };







}]);
