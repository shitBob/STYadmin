import { reactive } from 'vue'
import { defineStore } from 'pinia'
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = reactive({
      PhoneNum:'',
      token:'',
      isLogin:false
    })
    function setProfile(data:any){
      profile.PhoneNum = data.PhoneNum
      profile.token = data.token
      profile.isLogin = true
    }
    function clearProfile(){
      profile.PhoneNum = ''
      profile.token = ''
      profile.isLogin = false
    }
    

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile
    }
  },
  // TODO: 持久化
  {
   persist: true
   
}
)
