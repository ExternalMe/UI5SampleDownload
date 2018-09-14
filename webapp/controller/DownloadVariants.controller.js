sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("nxpcm.sample.download.controller.DownloadVariants", {

		onInit: function () {
			var oLinks = new JSONModel({
				links: this._aLinks
			});
			this.getOwnerComponent().setModel(oLinks, "links");
		},

		downloadWithXHR: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			var oXHR = new XMLHttpRequest();
			oXHR.open("GET", sURL);
			oXHR.responseType = "blob";
			oXHR.onload = function () {
				if (oXHR.status < 400 && oXHR.response && oXHR.response.size > 0) {
					var sHeaderContentDisposition = decodeURIComponent(oXHR.getResponseHeader("content-disposition"));
					var aHeaderParts = sHeaderContentDisposition.split("filename=");
					aHeaderParts = aHeaderParts[1].split("\"");
					var sFilenameFromServer = aHeaderParts[1];
					if (sap.ui.Device.browser.msie) {
						window.navigator.msSaveOrOpenBlob(oXHR.response, sFilenameFromServer);
					} else {
						var oA = document.createElement("a");
						oA.href = window.URL.createObjectURL(oXHR.response);
						oA.style.display = "none";
						//if (sap.ui.Device.system.phone) {
						//  for whatver reason, it's not possible to set this for mobile devices
						//	oA.target = "_blank";
						//}
						oA.download = sFilenameFromServer;
						document.body.appendChild(oA);
						oA.click();
						document.body.removeChild(oA);
						// setTimeout is needed for safari on iOS
						setTimeout(function () {
							window.URL.revokeObjectURL(oA.href);
						}, 250);
					}
				} else {
					MessageToast.show("Something went wrong!");
				}
			}.bind(this);
			oXHR.onerror = function () {
				MessageToast.show("Something went wrong!");
			}.bind(this);
			oXHR.send();
		},

		downloadWithA: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			var oA = document.createElement("a");
			oA.href = sURL;
			oA.style.display = "none";
			document.body.appendChild(oA);
			oA.click();
			document.body.removeChild(oA);
		},

		downloadWithABlank: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			var oA = document.createElement("a");
			oA.href = sURL;
			oA.target = "_blank";
			oA.style.display = "none";
			document.body.appendChild(oA);
			oA.click();
			document.body.removeChild(oA);
		},

		downloadWithIFrame: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			var sIFrame = "<iframe src=" + sURL + " style='display:none'></iframe>";
			var oHTML = this.getView().byId("idIFrameDownload");
			oHTML.setContent(sIFrame);
		},

		downloadWithWindowOpen: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			window.open(sURL);
		},

		downloadWithWindowOpenSelf: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			window.open(sURL, "_self");
		},

		downloadWithWindowLocationHref: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			window.location.href = sURL;
		},

		downloadWithURLHelper: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			sap.m.URLHelper.redirect(sURL);
		},

		downloadWithURLHelperNewWindow: function (oEvent) {
			var sURL = oEvent.getSource().data("link");
			sap.m.URLHelper.redirect(sURL, true);
		},

		_aLinks: [{
			text: "DOCX",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFD64810FCF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFD64810FCF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "JPG",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFB293FE1EF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFB293FE1EF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "PDF",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFC4F1E78CF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDFC4F1E78CF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "TXT",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1EE8AAC555F40B2F5126%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1EE8AAC555F40B2F5126%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "XCF",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DE1C3CF2510F32%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DE1C3CF2510F32%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "ZIP",
			inline: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDF4F71888EF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!i')/$value",
			attachment: "/sap/opu/odata/nxpcm/HG_SRV/ElementContSet(Hrchyid='EASYSAMPLE',Path='ROOT%3B%3BDOWNLOADTEST%3B%3BDOCUMENTDT%3A%3A00505601032B1ED8A7DDF4F71888EF32%C2%A7%C2%A7%C2%A7%24%24%24001!!!a')/$value"
		}, {
			text: "INCORRECT URL",
			inline: "https://www.wrongurl.org/nodocument",
			attachment: "https://www.wrongurl.org/nodocument"
		}]
	});
});