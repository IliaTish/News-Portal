<?php
class View_Comments extends View{

	function sortThree($data,$user,$parent = 0, $level = 0){
		static $html = "<div class=\"input-group\">
        <input type=\"text\" id=\"userComment\" class=\"form-control input-sm chat-input\" placeholder=\"Write your message here...\" />
	    <span class=\"input-group-btn\">     
            <a class=\"btn btn-primary btn-sm add-comment-button\"><span class=\"glyphicon glyphicon-comment\"></span> Add Comment</a>
        </span>
    </div>";
		$arr = $data[$parent];
		for($i = 0; $i < count($arr); $i++){
			 $html = $html."<div data-id = \"".$arr[$i]['id']."\" style=\"margin-left:".$level."px;\" class=\"row comment-post\">
            <div class=\"panel panel-white post panel-shadow\">
                <div class=\"post-heading\">
                    <div class=\"pull-left image\">
                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" class=\"img-circle avatar\" alt=\"user profile image\">
                    </div>
                    <div class=\"pull-left meta\">
                        <div class=\"title h5\">";
                        if($arr[$i]['pid'] == 0)
                            $html = $html."<a href=\"#\"><b>".$arr[$i]['author']."</b></a>
                            made a post.";
                        else{
                        	$html = $html."<a href=\"#\"><b>".$arr[$i]['author']."</b></a>
                            reply to <b data-pid=\"".$arr[$i]['pid']."\" class=\"reply-author\">".$arr[$i]['parentAuthor']."</b>.";
                        }
                        $html = $html."</div>
                        <h6 class=\"text-muted time\">".$arr[$i]['date']."</h6>
                    </div>
                </div> 
                <div class=\"post-description\"> 
                    <p class=\"comment-content-inside\">".$arr[$i]['content']."</p>
                    <div class=\"stats\">
                        <a href=\"#\" data-id = \"".$arr[$i]['id']."\" data-postid = \"".$arr[$i]['postid']."\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-up icon\"></i>".$arr[$i]['positiveRating']."
                        </a>
                        <a href=\"#\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-down icon\"></i>".$arr[$i]['negativeRating']."
                        </a>
                        <button data-level=\"".$level."\" data-postid = \"".$arr[$i]['postid']."\" data-author=\"".$arr[$i]['author']."\" data-id=\"".$arr[$i]['id']."\" class=\"btn btn-default	reply-button\">Ответить</button>
                    <div class=\"clearfix\"></div>
                    </div>
                </div>
            </div>
        </div>";
        if(isset($data[$arr[$i]['id']])){
				View_Comments::sortThree($data,$user,$arr[$i]['id'],$level+20);
			}
		}
		return $html;
	}

	function generateReplyComment($data){
		$level = $data['level']+20;
		echo "<div data-id = \"".$data['id']."\" style=\"margin-left:".$level."px;\" class=\"row comment-post\">
            <div class=\"panel panel-white post panel-shadow\">
                <div class=\"post-heading\">
                    <div class=\"pull-left image\">
                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" class=\"img-circle avatar\" alt=\"user profile image\">
                    </div>
                    <div class=\"pull-left meta\">
                        <div class=\"title h5\">
                            <a href=\"#\"><b>".$data['author']."</b></a>
                            reply to <b data-pid =\"".$data['pid']."\" class=\"reply-author\">".$data['parentAuthor']."</b>.
                        </div>
                        <h6 class=\"text-muted time\">".$data['date']."</h6>
                    </div>
                </div> 
                <div class=\"post-description\"> 
                    <p class=\"comment-content-inside\">".$data['content']."</p>
                    <div class=\"stats\">
                        <a href=\"#\" data-id = \"".$data['id']."\" data-postid = \"".$data['postid']."\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-up icon\"></i>".$data['positiveRating']."
                        </a>
                        <a href=\"#\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-down icon\"></i>".$data['negativeRating']."
                        </a>
                        <button data-level = \"".$level."\" data-postid = \"".$data['postid']."\" data-author=\"".$data['author']."\" data-id=\"".$data['id']."\" class=\"btn btn-default	reply-button\">Ответить</button>
                    <div class=\"clearfix\"></div>
                    </div>
                </div>
            </div>
        </div>";
	}


	function generateComment($data){
		$zero = 0;
		echo "<div data-id=\"".$data['id']."\" style=\"margin-left:".$zero."px;\" class=\"row comment-post\">
            <div class=\"panel panel-white post panel-shadow\">
                <div class=\"post-heading\">
                    <div class=\"pull-left image\">
                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" class=\"img-circle avatar\" alt=\"user profile image\">
                    </div>
                    <div class=\"pull-left meta\">
                        <div class=\"title h5\">
                            <a href=\"#\"><b>".$data['author']."</b></a>
                            made a post.
                        </div>
                        <h6 class=\"text-muted time\">".$data['date']."</h6>
                    </div>
                </div> 
                <div class=\"post-description\"> 
                    <p class=\"comment-content-inside\">".$data['content']."</p>
                    <div class=\"stats\">
                        <a href=\"#\" data-id = \"".$data['id']."\" data-postid = \"".$data['postid']."\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-up icon\"></i>".$data['positiveRating']."
                        </a>
                        <a href=\"#\" class=\"btn btn-default stat-item\">
                            <i class=\"fa fa-thumbs-down icon\"></i>".$data['negativeRating']."
                        </a>
                        <button data-level = \"".$zero."\" data-postid = \"".$data['postid']."\" data-author=\"".$data['author']."\" data-id=\"".$data['id']."\" class=\"btn btn-default	reply-button\">Ответить</button>
                    <div class=\"clearfix\"></div>
                    </div>
                </div>
            </div>
        </div>";
	}

	function generateComments($arr){
		session_start();
		$user = "";
		if(isset($_SESSION['login'])){
			$user = $_SESSION['login'];
		}
		echo View_Comments::sortThree($arr,$user,0,0);
	}

	}

?>