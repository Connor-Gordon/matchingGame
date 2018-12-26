$(document).ready(function(){
	var container = document.querySelector("#pics")
	var cardTemplate = ""
	var matchedArray = []
	var compareArray = []
	var gameCounter = 25
	var cardsArray = [
	{pic:"https://image.flaticon.com/icons/svg/235/235405.svg"}, { pic: "https://image.flaticon.com/icons/svg/235/235349.svg"}, {pic:"https://image.flaticon.com/icons/svg/1303/1303576.svg"}, {pic:"https://image.flaticon.com/icons/svg/235/235349.svg"},{pic:"https://image.flaticon.com/icons/svg/235/235405.svg"},{pic:"https://image.flaticon.com/icons/svg/1303/1303576.svg"},{pic:"https://image.flaticon.com/icons/svg/578/578372.svg"},{pic:"https://image.flaticon.com/icons/svg/235/235361.svg"},{pic:"https://image.flaticon.com/icons/svg/578/578372.svg"},{pic:"https://image.flaticon.com/icons/svg/235/235361.svg"},{pic:"https://image.flaticon.com/icons/svg/1198/1198062.svg"},{pic:"https://image.flaticon.com/icons/svg/1363/1363376.svg"},{pic:"https://image.flaticon.com/icons/svg/1198/1198062.svg"},{pic:"https://image.flaticon.com/icons/svg/235/235396.svg"},{pic:"https://image.flaticon.com/icons/png/512/523/523445.png"},{pic:"https://image.flaticon.com/icons/svg/235/235396.svg"},{pic:"https://image.flaticon.com/icons/svg/1363/1363376.svg"},{pic:"https://image.flaticon.com/icons/png/512/523/523445.png"}].sort( ()=> Math.random() - 0.5 );
	

	// pulls pics from array and inserts into template to display in html

	cardsArray.forEach(function(card){
		cardTemplate += `
		<div class='card'>
			<div class="frontcolor front">
			</div>
			<div class="randomPic back">
				<img src="${card.pic}"/>
			</div>
		</div>`	
	})
	container.innerHTML = cardTemplate

// start game function

	$("#startButton").on('click', function(){
		$('#startScreen').hide();
		$('.card').show();
		$('#countDisplay').show()
		document.getElementById("countDisplay").innerHTML = "Turns left: " + gameCounter

// start timer

		var second = 0, minute = 0;
		var timer = document.querySelector("#timer");
		var interval;
		interval = setInterval(function(){
	        timer.innerHTML = minute+"mins "+second+"secs";
	        second++;
	        if(second == 60){
	            minute++;
	            second = 0;
	        }

// display if lose from time running out

	        if(minute == 10){
	        	$(".card").hide()
				$(".lose").show()
				timer.innerHTML = "Time ran out, you lose!"
	        }

// stop timer to display for win

	        if(matchedArray.length === 18 || gameCounter == 0){
				clearInterval(interval)
				timer.innerHTML = "Elapsed time: " + minute+"mins "+second+"secs";
			}
		},1000);
		$('#timer').show()
	})

// card flip

	$(".card").flip({
			trigger:'manual'
		});

	
// on click, push cards to array to compare

	if(!$(".card").hasClass('flipped') && !$(".card").hasClass('match')){
		$(".card").on('click', function(e){
			$(this).flip(true)
			compareArray.push($(this).html())
			$(this).addClass('flipped')
			var counter = compareArray.length
			if(counter === 2){

// adjust game counter

				gameCounter--
				document.getElementById("countDisplay").innerHTML = "Turns left: " + gameCounter

// when cards match

				if(compareArray[0] ===  compareArray[1]){
					console.log('match')
					matchedArray.push($(compareArray[0]), $(compareArray[1]))
					$(".flipped").addClass('match')
					$(".match").removeClass('flipped')
					$(".match").off('.flip')

// display when win

					if(matchedArray.length === 18){
						$(".card").hide()
						$(".win").show()
						clearInterval(interval)
					}
					compareArray = []
				} else {

// display when lose from turns

					if(gameCounter == 0){
						$(".card").hide()
						$(".lose").show()

// flip back cards if no match

					} else {
						setTimeout(function(){
							console.log('no match')

						$(".flipped").flip(false)

						$('.flipped').removeClass("flipped")

					}, 1000)
						compareArray = []

					}

				}
			}
		})


	}

	
})


