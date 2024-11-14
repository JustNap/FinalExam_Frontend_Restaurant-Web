angular.module('chatApp', [])
.controller('ChatController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.messages = [];
    $scope.userInput = '';
    $scope.adminInput = '';

    // Fungsi untuk mengirim pesan
    $scope.sendMessage = function(who) {
        if (who === 'user' && $scope.userInput) {
            const userMessage = {
                from: 'User',
                text: $scope.userInput,
                timestamp: new Date()
            };
            $scope.messages.push(userMessage);
            $scope.userInput = '';

            $timeout(() => {
                const adminMessage = {
                    from: 'Admin',
                    text: 'Terima kasih, kami akan menjawab segera.',
                    timestamp: new Date()
                };
                $scope.messages.push(adminMessage);
            }, 1000);
        } else if (who === 'admin' && $scope.adminInput) {
            const adminMessage = {
                from: 'Admin',
                text: $scope.adminInput,
                timestamp: new Date()
            };
            $scope.messages.push(adminMessage);
            $scope.adminInput = '';
        }
    };

    $scope.checkEnter = function(event, who) {
        if (event.which === 13) { 
            $scope.sendMessage(who);
        }
    };
}]);