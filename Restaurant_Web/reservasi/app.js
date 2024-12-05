const app = angular.module('reservationApp', []);

app.controller('ReservationController', function ($scope, $timeout) {
    const layouts = {
        Indoor: [
            ['1A', '1B', '1C', '1D'],
            ['2A', '2B', '2C', '2D'],
            ['3A', '3B', '3C', '3D'],
            ['4A', '4B', '4C', '4D']
        ],
        Outdoor: [
            ['1A', '1B', '1C', '1D'],
            ['2A', '2B', '2C'],
            ['3A', '3B', '3C', '3D'],
            ['4A', '4B', '4C']
        ],
        VIP: [
            ['1A', '1B', '1C'],
            ['2A', '2B'],
            ['3A'],
            ['4A'],
            ['5A', '5B'],
            ['6A', '6B', '6C']
        ]
    };

    const RESERVATION_TIME = 30 * 60 * 1000;

    $scope.reservation = {};
    $scope.reservationDetails = {};
    $scope.isSummaryVisible = false;
    $scope.tableRows = [];
    $scope.tableStatus = {};

    $scope.updateTableLayout = function () {
        const selectedType = $scope.reservation.tableType;

        if (selectedType && layouts[selectedType]) {
            $scope.tableRows = layouts[selectedType];
            $scope.tableStatus = {};
            $scope.tableRows.flat().forEach(seat => {
                $scope.tableStatus[seat] = { available: true, reservedUntil: null };
            });
        } else {
            $scope.tableRows = [];
        }
    };

    $scope.isTableAvailable = function (seat) {
        const status = $scope.tableStatus[seat];
        const currentTime = new Date().getTime();
        if (!status.available && currentTime > status.reservedUntil) {
            status.available = true;
            status.reservedUntil = null;
        }
        return status.available;
    };

    $scope.selectTable = function (seat) {
        if ($scope.isTableAvailable(seat)) {
            $scope.reservation.table = seat;
        } else {
            alert(`Table ${seat} is currently reserved.`);
        }
    };

    $scope.submitReservation = function () {
        if (
            $scope.reservation.name &&
            $scope.reservation.phone &&
            $scope.reservation.email &&
            $scope.reservation.date &&
            $scope.reservation.time &&
            $scope.reservation.guests &&
            $scope.reservation.table
        ) {
            const seat = $scope.reservation.table;

            $scope.tableStatus[seat].available = false;
            $scope.tableStatus[seat].reservedUntil = new Date().getTime() + RESERVATION_TIME;

            $scope.reservationDetails = {
                ...$scope.reservation,
                date: new Date($scope.reservation.date).toLocaleDateString('en-GB'),
                time: new Date($scope.reservation.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            $timeout(() => {
                $scope.tableStatus[seat].available = true;
                $scope.tableStatus[seat].reservedUntil = null;
            }, RESERVATION_TIME);

            $scope.isSummaryVisible = true;
        } else {
            alert('Please fill out all required fields.');
        }
    };

    $scope.resetForm = function () {
        $scope.reservation = {};
        $scope.isSummaryVisible = false;
        $scope.tableRows = [];
    };
});
