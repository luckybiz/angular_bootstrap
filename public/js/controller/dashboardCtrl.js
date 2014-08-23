function DashboardCtrl($scope, $filter, ngTableParams, Dashboard, Layout, Graph, $timeout){
	$scope.title = "Dashboard";
	var data;
	
	$scope.getLayoutList = function(){
		Layout.getList().$then(function(res){
			$scope.layouts = res.data;
		});
	};
	$scope.getLayoutList();
	
	$scope.getGraphList = function(){
		Graph.getList().$then(function(res){
			$scope.graphs = res.data;
		});
	};
	$scope.getGraphList();

	$scope.getList = function(){
		data = [];
		Dashboard.getList().$then(function(res){
			data = res.data;
			$scope.setTables();
		});
	};
	$scope.getList();

	$scope.setTables = function(){
		$scope.tableParams = new ngTableParams({
			page: 1,            // show first page
			total: data.length, // length of data
			count: 10,          // count per page
			sorting: {
				title: 'asc'     // initial sorting
			}
		});

		$scope.$watch('tableParams', function(params) {
			// use build-in angular filter
			var orderedData = params.sorting ? 
								$filter('orderBy')(data, params.orderBy()) :
								data;

			$scope.dashboards = orderedData.slice((params.page - 1) * params.count, params.page * params.count);
		}, true);

	};

	
	
	$scope.showManageModal = function(index){
		if (index == -1)
		{
			$scope.curDashboard = {title: '', layout: $scope.layouts[0]._id, graph: $scope.graphs[0]._id, filter_predefined: '', filter_ui: ''};
			$scope.newDashboard = true;
		} else {
			$scope.curDashboard = $scope.dashboards[index];
			$scope.newDashboard = false;
		}
		console.log($scope.curDashboard);
		$('#manageModal').modal('show');
	};


	$scope.saveDashboard = function(){
		console.log($scope.curDashboard);
		if ( $scope.newDashboard)
		{
			Dashboard.create($scope.curDashboard);
		} else{
			Dashboard.update($scope.curDashboard);
		}
		$('#manageModal').modal('hide');
		$scope.getList();
	};
	
	$scope.deleteDashboard = function(){
		Dashboard.delete($scope.curDashboard);
		$('#manageModal').modal('hide');
		$scope.getList();
	};

}