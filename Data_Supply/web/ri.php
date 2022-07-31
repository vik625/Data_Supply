<!DOCTYPE html>
<html>
<head>
  <title>Upload your files</title>
</head>
<body>
  <form enctype="multipart/form-data" action="" method="POST">
  <center>
    <h2>Do Watermarking</h2>
    <input type="file" name="uploaded_file"></input><br />
	<br/>
    <input type="submit" value="submit"></input>
  </form>
  <br/>
  <br/>
  <center>
  <a href="http://192.168.56.1:8081/newData.html">GO BACK</a>
  <br/>
  <br/>
</body>
</html>
<?PHP
  if(!empty($_FILES['uploaded_file']))
  {
    // $path = "uploads/";
    $path = basename( $_FILES['uploaded_file']['name']);
    if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $path)) {
      // echo "The file ".  basename( $_FILES['uploaded_file']['name']). 
      // " has been uploaded";

      // $fp = fopen($_FILES['uploaded_file']['name'], 'rb');
    //     while ( ($line = fgets($fp)) !== false) {
    //   echo "$line<br>";

    // }
$num = file_get_contents($_FILES['uploaded_file']['name']);
//echo $num;
$fname = $_FILES['uploaded_file']['name'];
    shell_exec("javac ahkserial.java");
    shell_exec("java ahkserial $fname");
	echo "watermarking has been done!!!";
	echo "  \nyour Data is at place 'C:\ xampp\htdocs\Data_Supply\web'";
    } else{
        echo "There was an error uploading the file, please try again!\n";
    }
  }
?>