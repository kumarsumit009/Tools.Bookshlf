function handelchange() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("result-box-message").innerHTML = "";
    document.getElementById("result-box-result").innerHTML = "";
};

function predictRank() {
    var percentile = document.getElementById("percentile").value;
    if (isNaN(percentile)) {
        document.getElementById("result-box-message").innerHTML = "Invalid Percentile!";
        document.getElementById("result-box-message").style.color = "red";
    }
    else {
        if (percentile <= 0 || percentile > 100) {
            document.getElementById("result-box-message").innerHTML = "Invalid Percentile!";
            document.getElementById("result-box-message").style.color = "red";
        }
        else {
            document.getElementById("loading").style.display = "block";
            document.getElementById("rank").innerHTML = "Calculating...";

            var rank = 1119889 - (percentile / 100) * (1119889 + 1);
            rank = Math.round(rank);
            // console.log(rank);
            var upperRank = rank + 10;
            var lowerRank = rank - 10;
            
            if (upperRank > 1119889) upperRank = 1119889;
            if (lowerRank <= 0) lowerRank = 1;
            setTimeout(function () {
                document.getElementById("loading").style.display = "none";
                document.getElementById("rank").innerHTML = "Predict Rank";
                document.getElementById("result-box-message").innerHTML = "Your Rank will be close to : ";
                document.getElementById("result-box-result").innerHTML = lowerRank + " - " + upperRank;
                document.getElementById("result-box-result").style.color ="yellowgreen";
            },3000);
        }
    }
};