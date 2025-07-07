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
	'sap/ui/core/mvc/ControllerExtension',
	"sap/ui/generic/app/ApplicationController",
	"sap/ui/comp/smartfield/SmartField",
	"sap/suite/ui/generic/template/extensionAPI/extensionAPI"
	// ,'sap/ui/core/mvc/OverrideExecution'
],
	function (
		ControllerExtension, ApplicationController, SmartField, extensionAPI
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
			override: {
				/**
				 * Called when a controller is instantiated and its View controls (if available) are already created.
				 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
				 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
				 */
				onInit: function () {
					this.oView = this.base.getView();
					this.oModel = this.base.getView().getController().getAppComponent().getModel("customer.UI_CNCSALESDOCU_02");
				},

				/**
				 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
				 * (NOT before the first rendering! onInit() is used for that one!).
				 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
				 */
				onBeforeRendering: function () {
				},

				/**
				 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
				 * This hook is the same one that SAPUI5 controls get after being rendered.
				 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
				 */
				onAfterRendering: function () {
				},

				/**
				 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
				 * @memberOf customer.cgdc.managesalesorderv2.cisadnavigation
				 */
				onExit: function () {
				},

				// override public method of the base controller
				basePublicMethod: function () {
				}
			},

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
			},

			onClickActionxCGDCxC_ContractManagement_copyAsReference: function (oEvent) {
				var that = this;
				this.oObject = oEvent.getSource().getParent().getParent().getBindingContext().getObject();
				if (!this.copyAsReferenceDialog) {
					this.copyAsReferenceDialog = sap.ui.xmlfragment("idFragCopyAsRef",
						"customer.cgdc.managesalesorderv2.changes.fragments.CopyAsReference",
						this);
					// Bind the named model only to the fragment
					this.copyAsReferenceDialog.setModel(
						this.oModel
					);

					this.oView.addDependent(this.copyAsReferenceDialog);
				}

				var form = sap.ui.getCore().byId("idFragCopyAsRef--idSalesDocType");
				this.oModel.metadataLoaded().then(function () {
					var context = that.oModel.createEntry("/xCGDCxC_CNCSalesDocument");
					form.setBindingContext(context);
					that.copyAsReferenceDialog.open();
				});

			},

			onCopyasRefClose: function () {
				this.copyAsReferenceDialog.close();
				this.copyAsReferenceDialog.destroy();
				this.copyAsReferenceDialog = "";
				this.oModel.resetChanges();
			},


			onSubmitcopyAsReference: function (oEvent) {
				var that = this;
				var oSalesDocNumber = sap.ui.getCore().byId("idFragCopyAsRef--idSalesDocField");
				var sRefDocValue = oSalesDocNumber.getValue();
				var sSalesOrderNum = this.oObject.SalesOrder;
				var sSalesDocumentType = this.oObject.SalesOrderType;
				that.oResourceBundle = this.base.getView().getController().getOwnerComponent().getModel("i18n").getResourceBundle();
				if (!sRefDocValue) {
					oSalesDocNumber.setValueState('Error');
					oSalesDocNumber.setValueStateText(that.oResourceBundle.getText("SalesDocumentTypeVal"));
					return;
				}
				that.oBusyDialog = new sap.m.BusyDialog({
					text: that.oResourceBundle.getText("BusyDialogMessage"), // Message text
				});
				that.oBusyDialog.open();
				var aFilters = [
					new sap.ui.model.Filter("vbeln", sap.ui.model.FilterOperator.EQ, sRefDocValue),
				];

				var sPath = "/xCGDCxC_CNCSalesOrderCustom";
				this.oModel.read(sPath, {
					filters: aFilters,
					urlParameters: {
						"$expand": "todeliveryschedule" // navigation property
					},
					success: async function (oData) {

						if (!that._oApplicationController_CopyAsRef) {
							that._oApplicationController_CopyAsRef = new ApplicationController(that.oModel, that.base.getView());
						}
						const oDataResults = oData.results // Array of sales order item objects;

						//Validation message to handle if no data found 
						if (!oDataResults || oDataResults.length === 0) {
							// that.hideBusyIndicator();
							that.oBusyDialog.close();
							sap.m.MessageBox.information(that.oResourceBundle.getText("NoDataFound"));
							return;
						}

						var oSalesDocNumber = {
							SalesDocument: sRefDocValue,
							RefDocument: sRefDocValue,
							SalesOrderDocument: sSalesOrderNum,
							SalesDocumentType: sSalesDocumentType
						};

						that.CNCItem_Model = oDataResults.map(item => ({
							SalesDocument: item.vbeln,
							ConditionRecordNo: item.knumh,
							DeliveryReleaseNo: item.xcgdcxdlvrlno,
							SalesOrderDocument: item.vbeln,
							SalesDocumentItem: item.posnr,
							CNCReferenceValue: item.xcgdcxccref_val,
							CNCReferenceType: item.xcgdcxccref_typ,
							SalesOrderBlock: item.xcgdcxso_block,
							BlkInd: item.xcgdcxso_block !== "" ? "1" : "",
							HigherLevelItem: item.uepos,
							ReferenceItemNumber: item.vgpos,
							Material: item.matnr,
							MaterialName: item.maktx,
							BlockDescription: item.descr,
							OpenQuantity: item.open_qty,
							TargetQuantity: item.targ_qty,
							SalesUnit: item.vrkme,
							CNCReferenceValueDescription: item.xcgdcxccref_typ === 'E' ? "ELINE" : "Non-ELINE",
							Selection: item.selkz
						}));

						try {
							const aErrorMessages = [];
							var oRootResponse = await that.createDraftEntry(that._oApplicationController_CopyAsRef, "xCGDCxC_CNCSalesDocument", "/xCGDCxC_CNCSalesDocument", oSalesDocNumber); //Create draft entry for root
							if (oRootResponse) {
								const sPath = oRootResponse.context.sPath + "/to_CNCItem";
								for (var i = 0; i < oDataResults.length; i++) {
									try {
										var oItemResponse = await that.createDraftEntry(that._oApplicationController_CopyAsRef, "xCGDCxC_CNCItem", sPath, that.CNCItem_Model[i]); //Create draft entry for items
										const sDeliveryPath = oItemResponse.context.sPath + "/to_DeliverySchedule";
										for (var j = 0; j < oDataResults[i].todeliveryschedule.results.length; j++) {
											try {
												var oDeliverySchedule = that.buildPayloadforDelvSchedule(oDataResults[i].todeliveryschedule.results[j]); //Create draft entry for schedule lines
												var oItemResponse = await that.createDraftEntry(that._oApplicationController_CopyAsRef, "xCGDCxC_CNCDeliverySch", sDeliveryPath, oDeliverySchedule);
											} catch (deliveryError) {
												// const errorMessage = deliveryError?.message || JSON.stringify(deliveryError, Object.getOwnPropertyNames(deliveryError));
												const msg = that.oResourceBundle.getText(
													"deliveryScheduleCreationError",
													[i + 1, j + 1, JSON.parse(deliveryError.response.responseText).error.message.value]
												);
												aErrorMessages.push(msg);
												continue;

											}
										}
									} catch (itemError) {
										// const errorMessage = itemError?.message || JSON.stringify(itemError, Object.getOwnPropertyNames(itemError));
										const msg = that.oResourceBundle.getText(
											"itemCreationError",
											[i + 1, JSON.parse(itemError.response.responseText).error.message.value]
										);
										aErrorMessages.push(msg);
										continue;
									}
								}
							}

							if (aErrorMessages.length > 0) {

								const aMessageItems = aErrorMessages.map(msg => ({
									type: "Error",
									title: that.oResourceBundle.getText("draftCreationErrorHeader"),
									description: msg
								}));



								const oMessageModel = new sap.ui.model.json.JSONModel();
								oMessageModel.setData(aMessageItems);
								// that.getView().setModel(oMessageModel, "errorMessagesModel");

								var oMessageTemplate = new sap.m.MessageItem({
									type: '{type}',
									title: '{description}',
									activeTitle: false
								});


								if (!that.oMessageView) {

									that.oMessageView = new sap.m.MessageView({
										showDetailsPageHeader: false,
										items: {
											path: "/",
											template: oMessageTemplate
										}
									});

									that.oMessageView.setModel(oMessageModel);

									that.oDialog = new sap.m.Dialog({
										resizable: true,
										content: that.oMessageView,
										state: 'Error',
										beginButton: new sap.m.Button({
											text: "Close",
											press: function () {
												that.oDialog.close();
											}
										}),
										customHeader: new sap.m.Bar({
											contentMiddle: [
												new sap.m.Title({
													text: that.oResourceBundle.getText("draftCreationErrorHeader"),
													level: sap.ui.core.TitleLevel.H1
												})
											]
										}),
										contentHeight: "50%",
										contentWidth: "50%",
										verticalScrolling: false
									});
								}


								that.oDialog.open();
								return;
							}

						} catch (e) {
							that.oBusyDialog.close();
							// that.hideBusyIndicator();
							sap.m.MessageBox.error(
								that.oResourceBundle.getText("ODataErrorcallback") +
								(e?.message || JSON.stringify(e))
							);
						}
						that.oBusyDialog.close();
						that.onCopyasRefClose();
						var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

						if (oRootResponse?.context?.sPath) { //to handle navigation path errors

							oCrossAppNavigator.toExternal({
								target: {
									shellHash: "#cnccopyasref-manage&" + oRootResponse.context.sPath
								}
							});
						} else {
							sap.m.MessageBox.error(that.oResourceBundle.getText("NavigationError"));
						}

					},
					error: function (e) {
						that.oBusyDialog.close();
						// that.hideBusyIndicator();
						sap.m.MessageBox.error(
							that.oResourceBundle.getText("ODataErrorcallback") +
							(JSON.parse(e.responseText)?.error?.message?.value || e?.message || JSON.stringify(e))
						);
					}
				});
			},

			createDraftEntry: function (oApplicationController, sEntitySet, sPath, oPrefinedData) {
				return new Promise(function (resolve, reject) {
					oApplicationController.getTransactionController().getDraftController().createNewDraftEntity(
						sEntitySet, sPath, oPrefinedData, true, {})
						.then(function (oResponse) {
							resolve(oResponse);
						}, function (oError) {
							reject(oError);
						});
				});
			},

			buildPayloadforDelvSchedule: function (oDelvScheduleResults) {
				var oDeliverySchedule = {
					ConditionRecordNo: oDelvScheduleResults.Knumh,
					DeliveryReleaseNo: oDelvScheduleResults.Dlvrlno,
					DeliveryDate: oDelvScheduleResults.Etdat,
					Selection: oDelvScheduleResults.selkz,
					SalesOrderDocument: oDelvScheduleResults.Vbeln,
					SalesUnit: oDelvScheduleResults.Vrkme,
					Quantity: oDelvScheduleResults.xcgdcxQty,
					TotalAvailableQuantity: oDelvScheduleResults.Total_aval,
					OpenAvailableQuantity: oDelvScheduleResults.Aval_qty

				}
				return oDeliverySchedule;
			}
		});
	});