import { shallowMount } from "@vue/test-utils";
import Radio from "@/components/Radio.vue";

describe("Radio.vue rendering", () => {
  // test that a warning us generated when no value is passed as a prop
  it("will generate a warning when the value prop is not passed", () => {
    const spy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
    shallowMount(Radio);

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
    spy.mockRestore();
  });

  // test that radio renders when only the required value prop is passed
  it("renders when value prop is passed", () => {
    const value = "radio value";

    const wrapper = shallowMount(Radio, {
      propsData: { value }
    });

    const sampleHTML = `<div role="radio" aria-checked="false" aria-label="${value}" tabindex="-1" class="beforeLabel"><!----></div>`;

    expect(wrapper.html()).toContain(sampleHTML);

    // if radio is created without a label prop, then aria-label attribute should be set to value
    expect(wrapper.attributes("aria-label")).toBe(value);
  });

  it("renders when value and label props are passed", () => {
    const value = "radio value";
    const label = "radio label";

    const wrapper = shallowMount(Radio, {
      propsData: { value, label }
    });

    const sampleHTML = `<div role="radio" aria-checked="false" tabindex="-1" class="beforeLabel"><div class="label">${label}</div></div>`;

    expect(wrapper.html()).toContain(sampleHTML);
  });

  it("renders when disabled prop is passed", () => {
    const value = "radio value";
    const disabled = true;

    const wrapper = shallowMount(Radio, {
      propsData: { value, disabled }
    });

    const sampleHTML = `<div role="radio" aria-checked="false" aria-disabled="${disabled}" aria-label="${value}" tabindex="-1" class="disabled beforeLabel"><!----></div>`;

    expect(wrapper.html()).toContain(sampleHTML);
    expect(wrapper.attributes("aria-disabled")).toBe("true");
  });

  // test the position prop
  it("renders radio position with relative to label based on the position prop", () => {
    const value = "radio value";
    const label = "radio label";

    let wrapper = shallowMount(Radio, {
      propsData: { value, label }
    });

    // when position prop is not set beforeLabel is the default position
    expect(wrapper.classes()).toContain("beforeLabel");

    let position = "afterLabel";
    wrapper = shallowMount(Radio, {
      propsData: { value, label, position }
    });

    // when position prop afterLabel radio is placed after label
    expect(wrapper.classes()).toContain("afterLabel");

    position = "belowLabel";
    wrapper = shallowMount(Radio, {
      propsData: { value, label, position }
    });

    // when position prop belowLabel radio is placed below label
    expect(wrapper.classes()).toContain("belowLabel");

    position = "aboveLabel";
    wrapper = shallowMount(Radio, {
      propsData: { value, label, position }
    });

    // when position prop belowLabel radio is placed below label
    expect(wrapper.classes()).toContain("aboveLabel");
  });
});
