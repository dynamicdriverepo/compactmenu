/* Compact Drop Down Menus
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

/*global jQuery,window,document,console*/

jQuery(function ($) {
	"use strict";
	//Library Function of the menu
	var menuLib = {
		'animEnd': 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend',
		'hasAnimation': null,
		'eventHandlerActive' : false,
		'zindex' : 1000,
		/*
		 * Detects if CSS animations is possible using Modernizr Libraries
		 * @returns {Boolean}
		 */
		'detectAnimation': function () {
			if (!window.Modernizr) {
				// Fail Safe return
				return false;
			}
			if (menuLib.hasAnimation === null) {
				var modernizr = window.Modernizr;
				menuLib.hasAnimation = modernizr.cssanimations && modernizr.csstransitions;
			}
			return menuLib.hasAnimation;
		},
		/*
		 * Set of jQuery Based animations
		 */
		'animations': {
			'slideFadeDown': function (el, down, callback) {
				callback = callback || function () { };
				el.animate({
					'opacity': '0',
					'marginTop': down + 'px'
				}, 400, callback);
			},
			'slideFadeinUp': function (el, callback) {
				callback = callback || function () {};
				el.animate({
					'opacity': '1',
					'marginTop': '0px'
				}, 400, callback);
			},
			'slideFadeLeft': function (el, opacity, left, callback) {
				callback =	callback || function () { };
				el.animate({
					'opacity': opacity,
					'left': left + 'px'
				}, 400, callback);
			},
			'slideFadeinLeft' : function (el, left, callback) {
				menuLib.animations.slideFadeLeft(el, 1, left, callback);
			},
			'slideFadeoutLeft' : function (el, left, callback) {
				menuLib.animations.slideFadeLeft(el, 0, left, callback);
			}
		},
		/*
		 * Generates a random ID to assign to a menuItem
		 * 
		 * @returns {integer}
		 */
		'genId': function () {
			return 10000 + Math.floor(Math.random() * 90001);
		},
		/*
		 * Initializes the submenus for the first time. Set their position and place them in the outer structure
		 * @param {type} menu
		 * @param {type} transition
		 */
		'initSubList': function (menu, transition) {
			menuLib.resetSubListPosition(menu, transition);
			$("ul.sub", menu).appendTo(menu); //Move the sublists to the outer Layer
		},
		/*
		 * Places the sub menus in appropriate position for each effect
		 * 
		 * @param {jQuery Selector} menu
		 * @param {string} transition
		 */
		'resetSubListPosition': function (menu, transition) {
			var sublists = $("ul.sub", menu);
			sublists.removeAttr('style');

			switch (transition) {

			case "slide-fade-left":
			case "inside-slide-fade-left":
				sublists.css({
					'marginTop': '0',
					'left' : menu.width(),
					'opacity': '0',
					'display': 'none'
				});
				break;

			case "set3":
			case "set4":
			case "set5":
				sublists.css({
					'marginTop': '0',
					'left' : '0',
					'display': 'none'
				});
				break;
			}
		},
		/*
		 * Reset the Menu Position
		 * 
		 * @param {jQuery Selector} menuContainer
		 * @param {string} transition
		 */
		'resetMenu': function (menu, transition) {
			//console.log('reset');
			$("ul:first", menu).css({
				'marginTop': '20px',
				'display': 'none',
				'left' : '0'
			});
			menuLib.resetSubListPosition(menu, transition);
		},
		'menu' : {
			/**
			 * Open the menu
			 * 
			 * @param {jQuery Selector} menu
			 * @param {JS Object} settings
			 */
			'open': function (menu) {
				menuLib.animations.slideFadeinUp($('ul:first', menu).show().addClass('active'));
				menu.data('status', 'opened');
			},
			/**
			 * Close the menu
			 * 
			 * @param {jQuery Selector} menu
			 * @param {JS Object} settings
			 */
			'close': function (menu) {
				menuLib.animations.slideFadeDown($("ul.active", menu).removeClass('active'), 20, function () {
					menuLib.resetMenu(menu, menu.data('transition'));
				});
				menu.data('status', 'closed');
			},
			'closeActive': function (menuClass) {
				var activeMenu = $(menuClass).has('.active');

				// Close previously opened menu
				menuLib.menu.close(activeMenu);
				activeMenu.removeClass('active');
			}
		},
		/**
		 * Go to the sub menu
		 * 
		 * @param {jQuery Selector} subElement
		 * @param {jQuery Selector} mainElement
		 * @param {jQuery Selector} menu
		 * @param {string} transition
		 */
		'goToSub': function (subElement, mainElement, menu, transition) {
			$('.active', menu).removeClass('active');
			if (!menuLib.detectAnimation()) {
				//Fallback Animation for all demos in unsupporting browser
				switch (transition) {
				case "slide-fade-left":
				case "inside-slide-fade-left":
				case "set3":
				case "set4":
				case "set5":
					menuLib.animations.slideFadeoutLeft(mainElement, "-" + menu.width());
					menuLib.animations.slideFadeinLeft(subElement.show().addClass('active'), '0');
					break;
				}
			} else {
				//Animations Supported
				switch (transition) {
				case "slide-fade-left":
					menuLib.animations.slideFadeoutLeft(mainElement, "-" + menu.width());
					menuLib.animations.slideFadeinLeft(subElement.show().addClass('active'), '0');
					break;
				case "inside-slide-fade-left":
					mainElement.show().addClass('inside-slide-fade-left-animation');
					menuLib.animations.slideFadeinLeft(subElement.show().addClass('active'), '0', function () {
						mainElement.removeClass('inside-slide-fade-left-animation').hide();
					});
					break;
				case "set3":
					mainElement.addClass('fade-out-scale-down-animation');
					menuLib.hideAfterTransition(mainElement);
					subElement.show().addClass('fade-in-rise-up-animation active');
					break;
				case "set4":
					mainElement.addClass('fade-out-rising-up-animation');
					menuLib.hideAfterTransition(mainElement);
					subElement.show().addClass('fade-in-rising-up-animation active');
					break;
				case "set5":
					mainElement.addClass('fade-out-fall-down-animation');
					menuLib.hideAfterTransition(mainElement);
					subElement.show().addClass('fade-in-falling-down-animation active');
					break;
				}
			}
		},
		'goToMain': function (subElement, mainElement, menu, transition) {
			$('.active', menu).removeClass('active');			
			if (!menuLib.detectAnimation()) {
				//Fallback animation for those who dont support animation
				switch (transition) {
				case "slide-fade-left":
				case "inside-slide-fade-left":
				case "set3":
				case "set4":
				case "set5":
					menuLib.animations.slideFadeinLeft(mainElement.show().addClass('active'), "0");
					menuLib.animations.slideFadeoutLeft(subElement, menu.width());
					break;
				}
			} else {
				//Animations Supported
				switch (transition) {
				case "slide-fade-left":
					menuLib.animations.slideFadeinLeft(mainElement.show().addClass('active'), "0");
					menuLib.animations.slideFadeoutLeft(subElement, menu.width());
					break;
				case "inside-slide-fade-left":
					mainElement.show().addClass('inside-slide-fade-left-out-animation active');
					menuLib.animations.slideFadeoutLeft(subElement, menu.width(), function () {
						mainElement.removeClass('inside-slide-fade-left-out-animation');//.show();
					});
					break;
				case "set3":
					mainElement.show().addClass('fade-in-scale-up-animation active');
					subElement.addClass('fade-out-fall-down-animation');
					menuLib.hideAfterTransition(subElement);
					break;
				case "set4":
					mainElement.show().addClass('fade-in-falling-down-animation active');
					subElement.addClass('fade-out-fall-down2-animation');
					menuLib.hideAfterTransition(subElement);
					break;
				case "set5":
					mainElement.show().addClass('fade-in-rising-up-animation active');
					subElement.addClass('fade-out-rising-up-animation');
					menuLib.hideAfterTransition(subElement);
					break;
				}
			}
		},
		/*
		 * Helper function to hide a element once animation finishes
		 * @param {jQuery Selector} element
		 */
		'hideAfterTransition': function (element) {
			//console.log(element);
			element.one(menuLib.animEnd, function () {
				$(this).hide();//.off(menuLib.animEnd);
			});
		},
		/*
		 * Initial call for all the handlers. Uses `menuLib.eventHandlerActive` as the flag
		 * 
		 * @param {String} menuClass
		 * @returns {Boolean false (in case if this function already ran} 
		 */
		'initEventHandler': function (menuClass) {
			//Check for the flag
			if (menuLib.eventHandlerActive === true) {
				return false;
			}

			//Prefix to a selector
			menuClass = '.' + menuClass;

			//Resize Handler
			$(window).on('resize', function () {
				$(menuClass).each(function () {
					$(this).width($(this).parent().innerWidth());
				});
			});

			/**
			 * Click hanndler when the icon is clicked
			 * 
			 * @param {Event Object} e
			 */
			$('body').on('click', menuClass + ' .compactanchor', function (e) {
				e.stopPropagation();
				e.preventDefault();
				var
					menu = $(this).closest(menuClass),
					status = menu.data('status');
				menu.css({zIndex: ++menuLib.zindex});
				
				menuLib.menu.closeActive(menuClass);
				
				if (status === 'closed') {
					menuLib.menu.open(menu);
				} else {
					menuLib.menu.close(menu);
				}
			});

			/*
			 * An handler attached to body to close all active menus
			 */
			$('body, html').on('click', function () {
				menuLib.menu.closeActive(menuClass);
			});

			/**
			 * Sub Menu on click Handler
			 * 
			 * @param {Event Object} e
			 */
			$('body').on('click', menuClass + ' ul > li', function (e) {
				e.stopPropagation();
				var
					menu = $(this).closest(menuClass),
					transition = menu.data('transition');

				if ($(this).data('sub')) {
					menuLib.goToSub($("#s" + $(this).data('sub')), $(this).parent('ul'), menu, transition);
				}
			});
			
			$('body').on('click', menuClass + ' ul > li a', function (e) {
				if(typeof $(this).closest("li").data('sub') !== 'undefined') {
					$(this).closest("li").trigger('click');
					return false;
				} else {
					if(!$(this).closest("li").hasClass('previous'))
						menuLib.menu.closeActive(menuClass);
				}
			});

			/**
			 * Previous Button on click handler
			 * 
			 * @param {Event Object} e
			 */
			$('body').on('click', menuClass + ' .previous', function (e) {
				e.stopPropagation();
				var
					menu = $(this).closest(menuClass),
					transition = menu.data('transition');

				if ($('a', $(this)).data('main')) {
					menuLib.goToMain($(this).parent('ul'), $("#m" + $('a', $(this)).data('main')).parent('ul'), menu, transition);
				}
				e.preventDefault();
			});
			
			/**
			 * Global event handler for animation end
			 */
			$('body').on(menuLib.animEnd, menuClass + ' ul', function () {
				var c = '';//Temp class Variable
				if ($(this).hasClass('active')) {
					c = 'active';
				}
				if ($(this).hasClass('sub')) {
					c = c.length > 1 ? c + ' sub' : 'sub';
				}
				$(this).attr('class', c);
			});

			//Set a flag to avoid multiple event delegation
			menuLib.eventHandlerActive = true;
		}
	};

	$.fn.menu = function (options) {
		//Extend the options provided with default options
		var
			settings = $.extend({
				'mode' : 'icon',
				'menuClass' : 'compactmenu',
				'theme': 'theme-default',
				'transition': 'slide-fade-left',
				'status': 'closed'
			}, options),
			menuClass = settings.menuClass;

		// Run the Event Handlers
		menuLib.initEventHandler(menuClass);

		/**
		 * Menu Processing
		 */
		return $(this).each(function () {
			var $m = $(this);//Helper variable if needed [Not needed till now]
				// Add the Menu Class, data attributes and Theme
			$m
				.attr({
					'class' : menuClass + " " + settings.theme,
					'data-transition' : settings.transition,
					'data-status' : settings.status
				})
				//Auto adjust to the Container's space 
				.css({ 'width': $m.parent().innerWidth() });

			/*
			 * Takes out all the submenu and places them in the outside container
			 */
			$("ul > li", $m).each(function () {
				if ($("li", $(this)).size() > 0) {
					$(this).children("a").append("<span class=\"sub\"></span>");

					var divId = menuLib.genId(),//Generate a unique id for the menu
						subList = $(this).children('ul');

					subList.attr({ 'class' : 'sub', 'id': 's' + divId})
						.prepend("<li class='previous'><a data-main=\"" + divId + "\" href=\"#\">&laquo; Previous</a></li>"); //Add a link to previous Element
					/**
					 * Give the current list an Unique ID and define its sub list as data attribute
					 */
					$(this).attr({ 'id' : 'm' + divId, 'data-sub':	divId});
				}
			});

			//Initialize the Sub Lists
			menuLib.initSubList($m, settings.transition);

			// Place the Main list a little below
			$m.children('ul:first').css({
				'marginTop': '20px',
				'display': 'none'
			})
				.addClass('topul');
		});
	};
});