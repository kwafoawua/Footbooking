angular.module('footBookingApp', [])
.controller(function(){
    $scope.club = {
        name :'',
        phoneNumber : [{
            phone: '',
            whatsapp: ''
        }],
        address: {
            street: '',
            location : []
        }
    }
})