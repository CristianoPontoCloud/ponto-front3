import { DevicePermissionCard } from "@/view/components/entities/marking-permition/device-permission-card";
import "@/view/styles/globals.css";
import { FormProvider, useForm } from "react-hook-form";
describe("<DevicePermissionCard />", () => {
	function MockMobile() {
		const form = useForm();
		return (
			<FormProvider {...form}>
				<DevicePermissionCard device="mobile" />
			</FormProvider>
		);
	}
	function MockWeb() {
		const form = useForm();
		return (
			<FormProvider {...form}>
				<DevicePermissionCard device="web" />
			</FormProvider>
		);
	}
	function getFields(device: "mobile" | "web") {
		return {
			hasAccess: `${device}.hasAccess`,
			photo: `${device}.photo`,
			throwJustify: `${device}.throwJustify`,
			pointMark: `${device}.pointMark`,
			facialRecognition: `${device}.facialRecognition`,
			biometricRecognition: `${device}.biometricRecognition`,
			barCode: `${device}.barCode`,
			badge: `${device}.badge`,
			pin: `${device}.pin`,
		};
	}
	it("MOBILE - Should render mobile text in span", () => {
		cy.mount(<MockMobile />);
		cy.contains("span", "Mobile").should("exist");
		cy.get("svg.lucide-smartphone").should("exist");
	});
	it("WEB - Should render web text in span", () => {
		cy.mount(<MockWeb />);
		cy.contains("span", "Web").should("exist");
		cy.get("svg.lucide-monitor").should("exist");
	});
	it("MOBILE - Should render fields in DevicePermissionCard", () => {
		cy.mount(<MockMobile />);
		const fieldsMobile = getFields("mobile");
		const arrFieldsMobile = Object.values(fieldsMobile);
		for (const field of arrFieldsMobile) {
			cy.get(`button[id='${field}']`).should("exist");
		}
	});
	it("WEB - Should render fields in DevicePermissionCard", () => {
		cy.mount(<MockWeb />);
		const fieldsWeb = getFields("web");
		const arrFieldsWeb = Object.values(fieldsWeb);
		for (const field of arrFieldsWeb) {
			cy.get(`button[id='${field}']`).should("exist");
		}
	});
	it("MOBILE - Should change value false to true when click in button", () => {
		cy.mount(<MockMobile />);
		const fieldsMobile = getFields("mobile");
		const arrFieldsMobile = Object.values(fieldsMobile);
		for (const field of arrFieldsMobile) {
			cy.get(`button[id='${field}']`).click();
			cy.get(`button[id='${field}']`).should("have.attr", "aria-checked", "true");
		}
	});
	it("WEB - Should change value false to true when click in button - web", () => {
		cy.mount(<MockWeb />);
		const fieldsWeb = getFields("web");
		const arrFieldsWeb = Object.values(fieldsWeb);
		for (const field of arrFieldsWeb) {
			cy.get(`button[id='${field}']`).click();
			cy.get(`button[id='${field}']`).should("have.attr", "aria-checked", "true");
		}
	});
	it("MOBILE - Should start value of area-checked with false", () => {
		cy.mount(<MockMobile />);
		const fieldsMobile = getFields("mobile");
		const arrFieldsMobile = Object.values(fieldsMobile);
		for (const field of arrFieldsMobile) {
			cy.get(`button[id='${field}']`).should("have.attr", "aria-checked", "false");
		}
	});
	it("WEB - Should start value of area-checked with false", () => {
		cy.mount(<MockWeb />);
		const fieldsWeb = getFields("web");
		const arrFieldsWeb = Object.values(fieldsWeb);
		for (const field of arrFieldsWeb) {
			cy.get(`button[id='${field}']`).should("have.attr", "aria-checked", "false");
		}
	});
});
