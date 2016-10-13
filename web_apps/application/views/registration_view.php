<!doctype html>
<html>
<head>
	<title>Tz Chat</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	
	<link rel="stylesheet" type="text/css" href="/assets/css/front-base.css" media="all">
	<link rel="stylesheet" type="text/css" href="/assets/css/front-style.css" media="all">
	<script src="/assets/js/jquery-1.11.3.min.js" type="text/javascript"></script>
	<script src="/assets/js/front-ui.js" type="text/javascript"></script>
</head>
<body>

	<div class="wrap">
		
		<!-- Header -->
		<div class="header">
			<h1>Register</h1>
			<a href="/" class="prev-btn">Prev</a> 
			<a href="/" class="home-btn">Home</a>
		</div>
		<!-- //Header -->
		
		<!-- Contents -->
		<div class="sub-content">
			
			<div class="join-bar">Chatting App</div>
			
			<div class="actpage">
				<table class="join-tbl">
					<colgroup>
						<col style="width:80px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th>Gender</th>
							<td>
								<input type="radio" id="man" name="gender" class="m-radio" checked=""><label for="man">남성</label>&nbsp;&nbsp;&nbsp;
								<input type="radio" id="women" name="gender" class="m-radio"><label for="women">여성</label>
							</td>
						</tr>
						<tr>
							<th>Meeting Type</th>
							<td>
								<select class="m-select">
									<option value="">Select</option>
									<option value="atype1">A-Type1</option>
									<option value="atype2">A-Type2</option>
									<option value="atype3">A-Type3</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>Talk Style</th>
							<td>
								<select class="m-select">
									<option value="">Select</option>
									<option value="btype1">B-Type1</option>
									<option value="btype2">B-Type2</option>
									<option value="btype3">B-Type3</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>ID</th>
							<td>
								<input type="text" class="calc-input">
								<a href="#" class="jb-btn">Check Dup</a>
							</td>
						</tr>
						<tr>
							<th>Password</th>
							<td>
								<input type="password" class="m-text">
							</td>
						</tr>
						<tr>
							<th>Check Password</th>
							<td>
								<input type="password" class="m-text">
							</td>
						</tr>

						<tr>
							<th>Nickname</th>
							<td>
								<input type="text" class="calc-input" placeholder="Nickname">
								<a href="#" class="jb-btn2">Check Dup</a>
							</td>
						</tr>
						<tr>
							<th>Age</th>
							<td>
								<select class="m-select">
									<option value="">Select</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>Email</th>
							<td>
								<input type="text" class="calc-input2"> @
								<select class="calc-select">
									<option value="">naver.com</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>Location</th>
							<td>
								<select class="calc-select">
									<option value="">Location</option>
								</select>
								<select class="calc-select">
									<option value="">Detail Location</option>
								</select>
								<p class="g-t"></p>
							</td>
						</tr>
					</tbody>
				</table>	
			</div>
			
			<br>
			
			<div class="write-btn"><a href="#">Register</a></div>
			
		</div>
		<!-- //Contents -->
		
		<!-- Footer -->
		<div class="footer">
			<p>
				<br>
				<br>
				<br>
				<br>
				<br>
			</p>
			<p class="copy"></p>
		</div>
		<!-- //Footer -->
		
	</div>

</body>
</html>