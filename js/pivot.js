$.fn.pivot = function(options) {
	// 변수를 선언합니다.
	var option = {
		width : 500,
		height : 450
	}

	var $target = $(this);
	var $items = $target.children();
	var $container = $target.wrap('<div></div>').parent();
	$.extend(option, options);

	// 스타일 지정합니다.
	$target.css({
		width : $items.length * option.width,
		height : option.height,
		position : 'absolute'
	});

	$items.css({
		'float' : 'left',
		width : option.width,
		height : option.height
	});

	$container.css({
		width : option.width,
		height : option.height,
		position : 'relative',
		overflow : 'hidden'
	});

	// 이벤트로 동작을 연결합니다.(피봇 기능 구현)
	var originalLeft = 0;
	var oldLeft = 0;
	var nowPosition = 0;
	var isDown = false;

	$target.on('mousedown', function(event) {
		isDown = true;
		oldLeft = originalLeft = event.clientX;
		event.preventDefault();
	});

	$target.on('mousemove', function(event) {
		if(isDown == true) {
			var distance = oldLeft - event.clientX;
			oldLeft = event.clientX;
			$target.animate({
				left : '-=' + distance
			}, 0);
			$target.stop(true);
		}

	});

	$target.on('mouseup', function(event) {
		isDown = false;
		if(originalLeft - event.clientX > option.width / 4) {
			movePosition(1);
		} else if(originalLeft - event.clientX < -option.width / 4) {
			movePosition(-1);
		}

		$target.animate({
			left : -nowPosition * option.width
		}, fast);
		event.preventDefault();

		function movePosition(direction) {
			var changePosition = nowPosition + direction;
			if(0 <= changePosition && changePosition < $items.length) {
				nowPosition = changePosition;
			}
		}

	});
}