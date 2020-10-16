import { mount } from "@vue/test-utils"
import FormpageAlt from "@/components/FormpageAlt.vue"

// import form_data from "@/components/form_data.vue"


describe("FormpageAlt", () => {
  it("reveals a notification when submitted", async () => {
    
    const wrapper = mount(FormpageAlt)

    await wrapper.find("[data-firstname]").setValue("alice")
    await wrapper.find("form").trigger("submit.prevent")

    expect(wrapper.find(".message").text()).toBe("alice")
  })
})