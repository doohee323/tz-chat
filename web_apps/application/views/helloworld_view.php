<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<html>
    <head>
        <title><?=$page_title?></title>
    </head>
    <body>
        <?php foreach($result as $row):?>
        <h3><?=$row->id?></h3>
        <p><?=$row->name?></p>
        <br />
        <?php endforeach;?>
    </body>
</html>