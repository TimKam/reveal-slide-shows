<!DOCTYPE html>
<html>
  <head> 
      <link rel='stylesheet' href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHR32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossirigin="anonymous">
    <meta charset="utf-8">
    <title>JS Issue Tracker</title>
  </head>
  <body >
    <script src="main.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="http://chancejs.com/chance.min.js"></script>
  </body>
</html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>JS Issue Tracker</title>

    <!-- Bootstrap -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  </head>
  <body onload="fetchIssues()">
    <div class="progress">
      <div class="progress-bar progress-bar-introduction" role="progressbar" style="width:20%">
        Introduction
      </div>
      <div class="progress-bar progress-bar-instructions" role="progressbar" style="width:20%">
        Instructions
      </div>
      <div class="progress-bar progress-bar-practiceround" role="progressbar" style="width:20%">
        Practice Round
      </div>
        <div class="progress-bar progress-bar-study" role="progressbar" style="width:20%">
          Study
        </div>
        <div class="progress-bar progress-bar-sumary" role="progressbar" style="width:20%">
          Summary
      </div>
    </div> 
    <div class="container">
      <h1>Human-Computer Interaction Experiment</h1>
      <div class="jumbotron">
        <h3>Interactive and Intelligent Systems Group, Umea University. Winter 2018/2019.</h3>
        <form id="issueInputForm">
          <div class="form-group">
            <label for="issueDescInput">Dear study participant,
              thank you for volunteering for this study.
              In this experiment, we ask you to play a game with a chatbot (the chatbot name is Furhat).
              The experiment will help us gain insights into how humans react to specific types of chatbot behavior.
              Your participation is completely voluntary - you are free to withdraw from this study any time.</label>
        
          <div class="form-group">
         
            <form action="/action_page.php" method="get">
              <input type="checkbox" name="study" value="consent"> I give my informed consent<br>
              <input type="submit" value="Submit">
            </form>

    </div>
   

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="http://chancejs.com/chance.min.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="main.js"></script>
  </body>
</html>
