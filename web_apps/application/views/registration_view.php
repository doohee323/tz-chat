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
			<h1>회원가입</h1>
			<a href="/" class="prev-btn">Prev</a> 
			<a href="/" class="home-btn">홈</a>
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
							<th>성별</th>
							<td>
								<input type="radio" id="man" name="gender" class="m-radio" checked=""><label for="man">남성</label>&nbsp;&nbsp;&nbsp;
								<input type="radio" id="women" name="gender" class="m-radio"><label for="women">여성</label>
							</td>
						</tr>
						<tr>
							<th>원하는 만남</th>
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
							<th>대화스타일</th>
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
							<th>아이디</th>
							<td>
								<input type="text" class="calc-input">
								<a href="#" class="jb-btn">중복확인</a>
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<input type="password" class="m-text">
							</td>
						</tr>
						<tr>
							<th>비밀번호확인</th>
							<td>
								<input type="password" class="m-text">
								<!--<p class="g-t">6~12자의 영문과 숫자만 가능합니다.</p>-->
							</td>
						</tr>

						<tr>
							<th>닉네임</th>
							<td>
								<input type="text" class="calc-input" placeholder="닉네임을 입력해주세요">
								<a href="#" class="jb-btn2">중복확인</a>
							</td>
						</tr>
						<tr>
							<th>나이</th>
							<td>
								<select class="m-select">
									<option value="">Select</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>이메일</th>
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
									<option value="">세부Location</option>
								</select>
								<p class="g-t">* 정확한 Location은 Chatting성공 확률이 높습니다.</p>
							</td>
						</tr>
					</tbody>
				</table>	
				
				<p class="j-check">
					<input type="checkbox" id="j01"> <label for="j01">이용약관에 동의합니다.</label> <a href="#">[약관보기]</a>
				</p>
				<p class="j-check">
					<input type="checkbox" id="j02"> <label for="j02">개인정보취급방침에 동의합니다.</label> <a href="#">[개인정보취급방침]</a>
				</p>
			</div>
			
			<br>
			
			<div class="write-btn"><a href="#">회원가입</a></div>
			
		</div>
		<!-- //Contents -->
		
		<!-- 푸터 -->
		<div class="footer">
			<p>
				<br>
				<br>
				<br>
				<br>
				<br>
			</p>
			<p class="copy">COPYRIGHT ⓒ 2016 Tz Chat. All Rights Reserved.</p>
		</div>
		<!-- //푸터 -->
		
	</div>

</body>
</html>