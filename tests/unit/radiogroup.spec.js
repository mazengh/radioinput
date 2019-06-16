import { shallowMount } from "@vue/test-utils";
import RadioGroup from "@/components/RadioGroup.vue";

function createTestProps(props) {
  return {
    v-model="radioVal"
        :checkedIndex="3"
        :labelId="radioGroupLabel.id"
        :labelText="radioGroupLabel.text"
        :radios="radioInputAry"
      apiId: '6e770272-212b-404e-ab9c-333fdba02f2f',
      cancelButton: true,
      allComments: [],
      theme: { custom: { maxCommentLength: 1300 } },
      ...props,
  };
}
let wrapper, props;
beforeEach(() => {
  props = createTestProps();
  wrapper = shallow(<Comment {...props} /> );
});


describe("RadioGroup.vue", () => {
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
