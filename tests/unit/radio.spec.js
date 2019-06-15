import { shallowMount } from "@vue/test-utils";
import Radio from "@/components/Radio.vue";

describe("Radio.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Radio, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
