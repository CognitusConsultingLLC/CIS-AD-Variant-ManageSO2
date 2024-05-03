/***
@controller Name:sap.fe.templates.ObjectPage.ObjectPageController,
*@viewId:cus.sd.salesorderv2.manage::SalesOrderManageObjectPage
*/
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension'
	// ,'sap/ui/core/mvc/OverrideExecution'
],
	function (
		ControllerExtension
		// ,OverrideExecution
	) {
		"use strict";
		return ControllerExtension.extend("customer.cgdc.managesalesorderv2.cisadnavigation", {
			// metadata: {
			// 	// extension can declare the public methods
			// 	// in general methods that start with "_" are private
			// 	methods: {
			// 		publicMethod: {
			// 			public: true /*default*/ ,
			// 			final: false /*default*/ ,
			// 			overrideExecution: OverrideExecution.Instead /*default*/
			// 		},
			// 		finalPublicMethod: {
			// 			final: true
			// 		},
			// 		onMyHook: {
			// 			public: true /*default*/ ,
			// 			final: false /*default*/ ,
			// 			overrideExecution: OverrideExecution.After
			// 		},
			// 		couldBePrivate: {
			// 			public: false
			// 		}
			// 	}
			// },

			// // adding a private method, only accessible from this controller extension
			// _privateMethod: function() {},
			// // adding a public method, might be called from or overridden by other controller extensions as well
			// publicMethod: function() {},
			// // adding final public method, might be called from, but not overridden by other controller extensions as well
			// finalPublicMethod: function() {},
			// // adding a hook method, might be called by or overridden from other controller extensions
			// // override these method does not replace the implementation, but executes after the original method
			// onMyHook: function() {},
			// // method public per default, but made private via metadata
			// couldBePrivate: function() {},
			// // this section allows to extend lifecycle hooks or override public methods of the base controller
			// override: {
			// 	/**
			// 	 * Called when a controller is instantiated and its View controls (if available) are already created.
			// 	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			// 	 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
			// 	 */
			// 	onInit: function() {
			// 	},

			// 	/**
			// 	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			// 	 * (NOT before the first rendering! onInit() is used for that one!).
			// 	 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
			// 	 */
			// 	onBeforeRendering: function() {
			// 	},

			// 	/**
			// 	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			// 	 * This hook is the same one that SAPUI5 controls get after being rendered.
			// 	 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
			// 	 */
			// 	onAfterRendering: function() {
			// 	},

			// 	/**
			// 	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			// 	 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
			// 	 */
			// 	onExit: function() {
			// 	},

			// 	// override public method of the base controller
			// 	basePublicMethod: function() {
			// 	}
			// } 

			onPressCISAD: function () {
				var sSalesOrder = this.getView().getBindingContext().getObject("SalesOrder");
				if (sSalesOrder) {
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					oCrossAppNavigator.toExternal({
						target: {
							shellHash: "#cgdcso-manage&/xCGDCxC_SALESORDER_T('" + sSalesOrder + "')"
						}
					});
				}
			},
			onPressCISADItem: function () {
				var sSalesOrder = this.getView().getBindingContext().getObject("SalesOrder");
				var sSalesOrderItem = this.getView().getBindingContext().getObject("SalesOrderItem");
				if (sSalesOrder && sSalesOrderItem) {
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					oCrossAppNavigator.toExternal({
						target: {
							shellHash: "#cgdcso-manage&/xCGDCxC_SALESORDER_T('" + sSalesOrder +
                                "')/to_SalesOrderItem(SalesOrder='" + sSalesOrder + "',SalesOrderItem='" + sSalesOrderItem + "')"
						}
					});
				}
			}
		});
	});