import { shallowMount } from "@vue/test-utils";
import Radio from "@/components/Radio.vue";
import RadioGroup from "@/components/RadioGroup.vue";

describe("Radio events", () => {
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
});
