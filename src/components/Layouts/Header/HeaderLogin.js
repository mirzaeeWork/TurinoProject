import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import styles from './HeaderLogin.module.css'
import SendOTP from './confirmOTP/SendOTP'
import ConfirmOtp from './confirmOTP/ConfirmOTP'
import useDynamicQuery from '@/hooks/useDynamicQuery'


function HeaderLogin ({ isOpenAuth, closeAuth, toggleAuth }) {
  const [confirmCode, setConfirmCode] = useState(false)

  const [formState, setFormState] = useState({
    mobile: '',
    codeOTP: null,
    userCode: '',
    timer: null,
    resendOTP:false
  })

  const { mutate, isPending } = useDynamicQuery({
    mode: 'mutation',
    method: 'post',
    url: '/auth/send-otp'
  })

  const prevMobileRef = useRef('')

  const OpenPageConfirmCode = () => {
    const { mobile, timer } = formState
    if (mobile === '' || (mobile === prevMobileRef.current && timer !== 0)) {
      closeAuth()
      setConfirmCode(true)
      return
    }

    prevMobileRef.current = mobile
    setFormState(prev => ({ ...prev, timer: 120 }))

    mutate(
      { mobile },
      {
        onSuccess: data => {
          toast(data.code)       
          toast.success(data.message)
          setFormState(prev => ({ ...prev, codeOTP: data.code,resendOTP:false }))
          closeAuth()
          setConfirmCode(true)
        },
        onError: error =>  {
          const text=error?.response?.data?.message === "Access token required"  ? "ابتدا وارد سایت شوید" : error?.response?.data?.message
          toast.error(text || error?.message)},
      }
    )
  }

  const closePageConfirmCode = () => {
    toggleAuth()
    setConfirmCode(false)
  }

  const closeAllPageLogin = () => {
    closeAuth()
    setConfirmCode(false)
  }

  return (
    <>
      <>
        <div
          className={`${styles.overlay} ${
            isOpenAuth || confirmCode ? styles.active : styles.closing
          }`}
          onClick={closeAllPageLogin}
        ></div>
        <div
          className={`${styles['slide-Auth']} ${
            isOpenAuth ? styles.active : confirmCode ? 'hidden' : ''
          }`}
        >
          <SendOTP
            formState={formState}
            setFormState={setFormState}
            closeAuth={closeAuth}
            OpenPageConfirmCode={OpenPageConfirmCode}
            isPending={isPending}
          />
        </div>
        <div
          className={`${styles['slide-Auth']} ${
            confirmCode ? styles.activ_confirm : isOpenAuth ? 'hidden' : ''
          }`}
        >
          <ConfirmOtp
            formState={formState}
            setFormState={setFormState}
            isPending={isPending}
            mutate={mutate}
            closePageConfirmCode={closePageConfirmCode}
            closeAllPageLogin={closeAllPageLogin}
          />
        </div>
      </>
    </>
  )
}

export default HeaderLogin
