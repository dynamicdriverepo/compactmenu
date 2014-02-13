# Compact Drop Down Menus #

*Description:* This is a multi-level drop down menu that's also a space saver, by stacking the sub menus on top of one another when revealed.  The markup for each drop down menu is simply plain HTML, transformed by the script afterwards into the result you see on the page. CSS3 transforms are used for the transition effect between sub menu changes, though the menu is functional in legacy browsers as well, including IE8+. With the advent of a myriad of screen sizes, especially smaller screens, a compact drop down menu may just be what the doctor ordered!

## Directions ##

*Step 1:* This script uses the following external files:

+ jQuery 1.10 or above (served via Google CDN)
+ jQuery Easing and Modernizr (served via Google CDN)
+ compactmenu.css
+ compactmenu.js

*Step 2:* Add the below code to the HEAD section of your page:

	<!-- Required Libraries -->
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js"></script>
	
	<!-- Load Menu Specific Files -->
	<script src="compactmenu.js"></script>
	<link rel="stylesheet" type="text/css" href="compactmenu.css" />
	
	<script>
	
	    $(function() {
						$("#menu1").menu({
							transition: 'inside-slide-fade-left'
						}); 
						 
						$("#menu2").menu({
							theme: 'theme-theme2'
						}); 
						 
						$("#menu3").menu({
							theme: 'theme-theme3',
							transition: 'set3'
						}); 
	    });
	</script>


*Step 3:* Then, add the below sample markup to your page:

	  <h2>Demo 1</h2>
	
	  <div class="container" style="width: 200px;">
	    <div id="menu1">
	      <div class="compactanchor">
	        <a href="#">Anchor Text</a>
	      </div>
	
	      <ul>
	        <li>
	          <a href="#">Explore DD</a>
	
	          <ul>
	            <li><a href="http://www.dynamicdrive.com/">Home</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/new.htm">New Scripts</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/forums/">Forums</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/style/">CSS Library</a></li>
	
	            <li><a href="http://tools.dynamicdrive.com">Tools</a></li>
	          </ul>
	        </li>
	
	        <li><a href="#">Link Text</a></li>
	
	        <li>
	          <a href="#">Link Text</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li>
	              <a href="#">Sub Link Text</a>
	
	              <ul>
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	              </ul>
	            </li>
	          </ul>
	        </li>
	
	        <li>
	          <a href="#">Link Text 2</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </div>
	
	  <h2>Demo 2</h2>
	
	  <div class="container" style="width: 200px;">
	    <div id="menu2">
	      <div class="compactanchor">
	        Compact Menu
	      </div>
	
	      <ul>
	        <li>
	          <a href="#">Explore DD</a>
	
	          <ul>
	            <li><a href="http://www.dynamicdrive.com/">Home</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/new.htm">New Scripts</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/forums/">Forums</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/style/">CSS Library</a></li>
	
	            <li><a href="http://tools.dynamicdrive.com">Tools</a></li>
	          </ul>
	        </li>
	
	        <li><a href="#">Link Text</a></li>
	
	        <li>
	          <a href="#">Link Text</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li>
	              <a href="#">Sub Link Text</a>
	
	              <ul>
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	              </ul>
	            </li>
	          </ul>
	        </li>
	
	        <li>
	          <a href="#">Link Text 2</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </div>
	
	  <h2>Demo 3</h2>
	
	  <div class="container" style="width: 200px;">
	    <div id="menu3">
	      <div class="icon compactanchor">
	        Icon
	      </div>
	
	      <ul>
	        <li>
	          <a href="#">Explore DD</a>
	
	          <ul>
	            <li><a href="http://www.dynamicdrive.com/">Home</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/new.htm">New Scripts</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/forums/">Forums</a></li>
	
	            <li><a href="http://www.dynamicdrive.com/style/">CSS Library</a></li>
	
	            <li><a href="http://tools.dynamicdrive.com">Tools</a></li>
	          </ul>
	        </li>
	
	        <li><a href="#">Link Text</a></li>
	
	        <li>
	          <a href="#">Link Text</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li><a href="#">Sub Link Text</a></li>
	
	            <li>
	              <a href="#">Sub Link Text</a>
	
	              <ul>
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	
	                <li><a href="#">Sub Link Text 1 - Sub</a></li>
	              </ul>
	            </li>
	          </ul>
	        </li>
	
	        <li>
	          <a href="#">Link Text 2</a>
	
	          <ul>
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	
	            <li><a href="#">Sub Link Text 2</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </div>

## Compact Drop Down Menus set up ##

See script project page for additional details on setup and documentation: <http://www.dynamicdrive.com/dynamicindex1/compactmenu.htm>
