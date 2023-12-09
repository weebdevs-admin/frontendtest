import React, {useEffect, useState} from 'react'
import ImageCrop from '../../Components/ImageCrop/ImageCrop.js'
import {useDispatch, useSelector} from 'react-redux'
import FieldContainer from '../../Components/FieldContainer/FieldContainer.js'
import BtnAddRemove from '../../Components/Buttons/BtnAddRemove.js'
import {editProfileImage, editUser} from '../Login/loginSlice.js'
import {successUploadImage, warningEmptyInput} from '../../Components/ToastMessages/ToastMessages.js'
import {checkEmptyString} from '../../App/globalFunctions.js'
import SmallLoader from '../../Components/Spinner/SmallLoader.js'

function EditProfile() {
    const dispatch = useDispatch()
    const {user, loading} = useSelector((state) => state.login)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        ...user,
        newPassword: '',
        repeatPassword: '',
        newLogin: ''
    })
    const handleChangeFirstname = (e) => {
        setCurrentUser({
            ...currentUser,
            firstname: e.target.value
        })
    }
    const handleChangeLastname = (e) => {
        setCurrentUser({
            ...currentUser,
            lastname: e.target.value
        })
    }
    const handleChangeNewLogin = (e) => {
        setCurrentUser({
            ...currentUser,
            newLogin: e.target.value
        })
    }
    const handleChangeNewPassword = (e) => {
        setCurrentUser({
            ...currentUser,
            newPassword: e.target.value
        })
    }
    const handleChangeConfirmPassword = (e) => {
        setCurrentUser({
            ...currentUser,
            repeatPassword: e.target.value
        })
    }
    const handleChangeImage = (croppedImage) => {
        const formData = new FormData()
        formData.append('file', croppedImage)
        dispatch(editProfileImage(formData)).then(({error, payload}) => {
            if (!error) {
                successUploadImage()
                setCurrentUser({
                    ...currentUser,
                    image: payload
                })
                setIsOpen(false)
            }
        })
    }
    const handleSubmit = () => {
        const {failed, message} = checkEmptyString([
            {
                value: currentUser.firstname,
                message: 'Ismi'
            },
            {
                value: currentUser.lastname,
                message: 'Familiyasi'
            },
            {
                value: currentUser.newPassword,
                message: 'Parol'
            },
            {
                value: currentUser.repeatPassword,
                message: 'Tasdiqlash paroli'
            },
            {
                value: currentUser.newLogin,
                message: 'Login'
            }
        ])
        if (failed) {
            warningEmptyInput(message)
        } else {
            const body = {
                _id: currentUser._id,
                market: currentUser.market,
                password: currentUser.newPassword.replace(/\s+/g, ' ').trim(),
                login: currentUser.newLogin.replace(/\s+/g, ' ').trim(),
                // image: currentUser.image.replace(/\s+/g, ' ').trim(),
                firstname: currentUser.firstname.replace(/\s+/g, ' ').trim(),
                lastname: currentUser.lastname.replace(/\s+/g, ' ').trim()
            }
            dispatch(editUser(body))
        }
    }
    useEffect(() => {
        setCurrentUser({
            ...user,
            newPassword: '',
            repeatPassword: '',
            newLogin: ''
        })
    }, [user])
    return (
        <section className={'mainPadding h-full'}>
            {loading &&
                <div
                    className='fixed backdrop-blur-[2px] left-0 right-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>}
            <ImageCrop output={currentUser.image} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}
                       approve={handleChangeImage} />
            <div className='flex gap-[2.5rem] mb-[2.5rem] w-full'>
                <FieldContainer
                    label={`Ismi`}
                    maxWidth={'grow'}
                    placeholder={'yangi ismi'}
                    type='text'
                    value={currentUser.firstname}
                    star={true}
                    onChange={handleChangeFirstname}
                />
                <FieldContainer
                    label={`Familiyasi`}
                    maxWidth={'grow'}
                    placeholder={'yangi familiyasi'}
                    type='text'
                    value={currentUser.lastname}
                    star={true}
                    onChange={handleChangeLastname}
                />
            </div>
            <div className='flex gap-[2.5rem] mb-[2.5rem] w-full'>
                <FieldContainer
                    label={`Login`}
                    maxWidth={'grow'}
                    placeholder={'yangi login'}
                    type='text'
                    value={currentUser.newLogin}
                    star={true}
                    onChange={handleChangeNewLogin}
                />
                <FieldContainer
                    label={`Parol`}
                    maxWidth={'grow'}
                    placeholder={'yangi parol'}
                    type='password'
                    value={currentUser.newPassword}
                    star={true}
                    onChange={handleChangeNewPassword}
                />
                <FieldContainer
                    label={`Parol takroriy`}
                    maxWidth={'grow'}
                    placeholder={'yangi parolni takror kiriting'}
                    type='password'
                    value={currentUser.repeatPassword}
                    star={true}
                    onChange={handleChangeConfirmPassword}
                />
            </div>
            <div className={'max-w-[15.625rem] mx-auto'}>
                <BtnAddRemove text={'Saqlash'} edit={true} onClick={handleSubmit} />
            </div>
        </section>
    )
}

export default EditProfile