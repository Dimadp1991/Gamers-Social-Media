import { React, useState } from 'react'
import $ from 'jquery'
import './AllUsersModal.css'
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io'
import { CgMoreO } from 'react-icons/cg'
import ReactTooltip from 'react-tooltip'
import ShowProfileComponent from './ShowProfileComponent'
import UserAvatar from './UserAvatar'
export default function AllUsersModal({ open, onClose, Profiles, MyProfile, friendTo }) {

    const [SelectedProfile, SetSeletedProfile] = useState()

    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#19273a',
        padding: '50px',
        zIndex: 1000,
        borderRadius: '5rem',
        width: '400px'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }

    /*     function textChanged() {
          
            console.log($("[name='input_message']").val());
        } */
    if (!open) { return null }

    function IsMyfriend(friend) {



        for (const fr of MyProfile.friends) {

            if (friend.userId == fr) {

                return true
            }
        }
        return false

    }



    function GetAllUserProfiles() {
        let items = []
        if (!Profiles) return
        for (let i = 0; i < Profiles.length; i++) {
            if (MyProfile.name == Profiles[i].name) {
                continue
            }


            if (IsMyfriend(Profiles[i])) {

                items.push(<div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<UserAvatar userId={Profiles[i].userId} size="60px" circle />

                    <label className="friend_img_label">{Profiles[i].name}</label>
                    <IoIosRemoveCircle className="Circle_icon" data-tip="remove friend"
                        onClick={() => { friendTo(Profiles[i].userId, 0); onClose() }} />
                    <CgMoreO className="Circle_icon" data-tip="more info" onClick={() => SetSeletedProfile(Profiles[i])} />
                </div>)
            }

            else {
                items.push(<div key={i}>
                    <UserAvatar userId={Profiles[i].userId} circle size="60px" />

                    <IoIosAddCircle className="Circle_icon" data-tip="add friend"
                        onClick={() => { friendTo(Profiles[i].userId, 1); onClose() }} />
                    <CgMoreO className="Circle_icon" data-tip="more info" onClick={() => SetSeletedProfile(Profiles[i])} />
                </div>)
            }

        }

        //console.log(items)
        return (
            <div>
                {items}
            </div>
        )
    }

    $('#btn_modal_up').removeAttr('disabled')
    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div className="container-md align-content-center " style={MODAL_STYLES}>
                {SelectedProfile ? <ShowProfileComponent ShowProfile={SelectedProfile} /> : null}
                <ReactTooltip />
                {GetAllUserProfiles()}
                <button id="btn_modal_up" className="btn-outline-danger" onClick={() => { onClose() }}>close</button>
            </div>

        </>
    )
}


