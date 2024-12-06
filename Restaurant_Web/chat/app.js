angular.module('chatApp', [])
.controller('ChatController', function($scope, $window) {
    $scope.user1 = {
        id: '1',
        firstName: 'User'
    };

    $scope.user2 = {
        id: '2',
        firstName: 'Admin'
    };


    $scope.currentUser = $scope.user1;
    $scope.messages = [];
    $scope.newMessage = '';
    $scope.showAttachments = false;

    $scope.getHeaderTitle = function() {
        return $scope.currentUser.id === $scope.user1.id ? 'Chat user' : 'Chat admin';
    };
    $scope.getOtherUser = function() {
        return $scope.currentUser.id === $scope.user1.id ? $scope.user2 : $scope.user1;
    };


    $scope.toggleUser = function() {
        $scope.currentUser = $scope.currentUser.id === $scope.user1.id ? $scope.user2 : $scope.user1;
    };

    $scope.sendMessage = function() {
        if (!$scope.newMessage.trim()) return;

        const message = {
            author: $scope.currentUser,
            text: $scope.newMessage,
            createdAt: new Date(),
            id: 'msg_' + Date.now()
        };

        $scope.messages.unshift(message);
        $scope.newMessage = '';
    };

    $scope.goBack = function() {
        $window.location.href = '../homepage/beranda.html';
    };
});