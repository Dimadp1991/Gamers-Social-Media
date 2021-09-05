

//import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import { FaSave, FaWindowClose } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import ReactTooltip from 'react-tooltip'
import AllUsersModal from '../components/AllUsersModal'
import RoomCard from '../components/RoomCard'
import UserAvatar from '../components/UserAvatar'
import axios from '../services/axios.config'
import { selectUser } from '../state/userSlice'
import { useParams } from 'react-router-dom'
import './members.css'


//import { get_all_profiles } from '../services/ProfileAPI'
export default function Members() {

	const [Carouselitems, SetCarouselitems] = useState([])
	const [all_profiles_list, set_profiles_list] = useState([])
	const { user } = useSelector(selectUser)
	const [userProfile, SetuserProfile] = useState(null)
	const [NumberOfFriends, SetNumberOfFriends] = useState(0)
	//const [FriendFocused, SetFriendFocused] = useState(null)
	const [isOpen, SetisOpen] = useState(false)
	const { id } = useParams()
	const fetchData = async () => {

		if (id == user.id) {
			window.location = '/members'
		}

		let { data: userProfiles } = await axios.get(`profiles/profile/${id}`)
		//console.log(res.data[0])



		const { data: all_profiles } = await axios.get('/profiles/all_profiles')

		//console.log(all_profiles_list)

		return {
			userProfile: userProfiles[0],
			allPrfiles: all_profiles,
		}


	}


	useEffect(async () => {
		const all_data = await fetchData()
		SetuserProfile(all_data.userProfile)
		set_profiles_list(all_data.allPrfiles)
		SetNumberOfFriends(all_data.userProfile.friends.length)
		InsertDataToForm(all_data.userProfile, all_data.allPrfiles)
		//SetImage_PreView()
		// eslint-disable-next-line 
	}, [])


	// function SetImage_PreView() {
	// 	let imagesPreview = function (input, placeToInsertImagePreview) {
	// 		if (input.files) {
	// 			let reader = new FileReader()
	// 			reader.onload = function (event) {
	// 				$($.parseHTML('<img>'))
	// 					.attr('src', event.target.result)
	// 					.attr('id', 'image-preview1')
	// 					.css('width', '200px')
	// 					.appendTo(placeToInsertImagePreview)
	// 			}
	// 			reader.readAsDataURL(input.files[0])
	// 			//console.log(input.files);
	// 		}

	// 	}



	// 	$('#img_upload_input').on('change', function () {
	// 		$('div.preview-images').empty()
	// 		imagesPreview(this, 'div.preview-images')

	// 	})

	// }


	// function UploadImageClick(event) {
	// 	event.preventDefault()

	// 	var formData = new FormData()
	// 	var imagefile = document.querySelector('#img_upload_input')
	// 	formData.append('file', imagefile.files[0])
	// 	//console.log(formData.get('file'))
	// 	axios.post(`/profile/img/upload_img/${user.id}`, formData, {
	// 		headers: {
	// 			'Content-Type': 'multipart/form-data'
	// 		}
	// 	}).then((res) => console.log(res))

	// }

	function uploadImage(event) {
		event.preventDefault()
		var formData = new FormData()
		var imagefile = document.querySelector('#img_upload_input')
		formData.append('file', imagefile.files[0])
		//console.log(formData.get('file'))
		axios.post(`/profile/img/upload_img/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(() => window.location.reload())

	}

	/* 	function OpenInput() {
	
			$('#img_upload_input').click()
			console.log('open')
			//$('#image-preview1').show()
		} */
	/* 
		function OpenEditName() {
	
			$('#name_lable').hide()
			$('#edit_name').css('display', 'block')
			$('#edit_name').val(userProfile.name)
			$('#save_name_icon').css('display', 'block')
			$('#close_name_icon').css('display', 'block')
		} */

	function SaveNewName() {
		userProfile.name = $('#edit_name').val()

		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#name_lable').text(userProfile.name)
		})

		$('#name_lable').show()

		$('#edit_name').hide()
		$('#save_name_icon').hide()
		$('#close_name_icon').hide()
	}

	function CloseNameEdit() {
		$('#name_lable').show()
		$('#edit_name').hide()
		$('#save_name_icon').hide()
		$('#close_name_icon').hide()
	}
	/* 
		function OpenEditEmail() {
			$('#email_lable').hide()
			$('#edit_email').css('display', 'block')
			$('#edit_email').val(user.email)
			$('#save_email_icon').css('display', 'block')
			$('#close_email_icon').css('display', 'block')
		} */

	function SaveNewEmail() {
		userProfile.email = $('#edit_email').val()
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#email_lable').text('Email: ' + userProfile.email)
		})


		$('#email_lable').show()
		$('#edit_email').hide()
		$('#save_email_icon').hide()
		$('#close_email_icon').hide()
	}

	function CloseEmailEdit() {
		$('#email_lable').show()
		$('#edit_email').hide()
		$('#save_email_icon').hide()
		$('#close_email_icon').hide()
	}

	/* function OpenEditAge() {
		$('#age_lable').hide()
		$('#birthdate_label').hide()
		$('#edit_age').css('display', 'block')
		$('#edit_age').val(userProfile.birth)
		$('#save_age_icon').css('display', 'block')
		$('#close_age_icon').css('display', 'block')
	}
 */

	function calcAge(birth) {
		if (birth) {
			//console.log(new Date(birth).getFullYear())
			let curr_year = new Date().getFullYear()
			let chosen = new Date(birth).getFullYear()
			return (curr_year - chosen)
		}
		return 0
	}

	function SaveNewAge() {
		//console.log($('#edit_age').val())
		userProfile.birth = new Date($('#edit_age').val())
		//console.log(userProfile.birth)
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#birthdate_label').text('Birthdate: ' + userProfile.birth.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }).replace(/\D/g, '/'))
		})

		$('#age_lable').text('Age: ' + calcAge(new Date($('#edit_age').val())))
		$('#age_lable').show()
		$('#birthdate_label').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()

	}

	function CloseAgeEdit() {
		$('#age_lable').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()
		$('#birthdate_label').show()
	}

	/* 	function OpenEditCountry() {
			$('#Country_lable').hide()
			$('#edit_Country').css('display', 'block')
			$('#edit_Country').val(userProfile.country)
			$('#save_country_icon').css('display', 'block')
			$('#close_country_icon').css('display', 'block')
	
		} */

	function SaveNewCountry() {

		userProfile.country = $('#edit_Country').val()
		//console.log(userProfile.birth)
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#Country_lable').text('Country: ' + userProfile.country)
		})


		$('#Country_lable').show()
		$('#edit_Country').hide()
		$('#save_country_icon').hide()
		$('#close_country_icon').hide()
	}

	function CloseCountryEdit() {
		$('#Country_lable').show()
		$('#edit_Country').hide()
		$('#save_country_icon').hide()
		$('#close_country_icon').hide()
	}

	function InsertDataToForm(user, others) {

		$('#name_lable').text(user.name)
		$('#email_lable').text('Email: ' + user.email)
		$('#birthdate_label').text('BirthDate: ' + new Date(user.birth).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }).replace(/\D/g, '/'))
		$('#age_lable').text('Age: ' + String(calcAge(user.birth)))
		$('#Country_lable').text('Country: ' + user.country)


		//console.log(messages_list)
		const friends = user.friends.map(friendId => {
			const profile = others.find(profile => profile.userId === friendId)

			const name = profile.name
			const id = friendId
			return { id, name }
		})
		SetCarouselitems(items => [...items, ...friends])
		/* 		 for (let i = 0; i < userProfile.friends.length; i++) {
					  const friend_id = userProfile.friends[i]
					  var friend_profile = all_profiles_list.find(obj => {
							return obj.userId == friend_id
					  })
					  friends_names[i] = (friend_profile.name)
					  //console.log(friends_names)
					  SetCarouselitems( items = > [...items,userProfile.friends])
					  SetCarouselitems(Carouselitems =>
							[...Carouselitems, <div key={i}>
								<label key={i} >{friends_names[i]}</label>
								<UserAvatar userId={friend_id} size="160" />
							</div>])
					   axios.get(`/profile/img/get_img/${friend_id}`).then(img => {
							  SetCarouselitems(Carouselitems =>
									[...Carouselitems, <div key={i}>
										<label key={i} >{friends_names[i]}</label>
										<img src={img.data} />
									</div>])
					   })
				 } */





	}

	$(function () {
		$('.carousel.carousel-slider .control-arrow').trigger('click')
	})





	function ActionFriendClicked(friend_Id, action) {
		if (action == 1) {

			axios.post('/notifications/new_note',
				{
					from_id: userProfile.userId,
					to_id: friend_Id,
					update: `<h5>You Have new Friend ${userProfile.name}<h5/>`,
					timestamp: new Date().now
				}).then(() => {

					//console.log('invitetion Sent')
				})



			axios.put('/friends_profiles/add_friend', { userID: userProfile.userId, FriendID: friend_Id }).then((res) => {
				console.log(res)
				window.location.reload()
			})




		}
		if (action == 0) {
			axios.post('/friends_profiles/delete_friend', { userID: userProfile.userId, friend_id_to_delete: friend_Id }).then((res) => {
				console.log(res)
				window.location.reload()
			})

			axios.post('/notifications/new_note',
				{
					from_id: userProfile.userId,
					to_id: friend_Id,
					update: `<h5>You And ${userProfile.name} Are No Longer Friends<h5/>`,
					timestamp: new Date().now
				}).then(() => {

					//console.log('invitetion Sent')
				})


		}

	}

	return (
		<>

			<div className="">
				<div className="container-fluid bar">
					<div className="container">
						<div className="row mx-auto text-center">
							<div className="col-md-3 my-4">

								<UserAvatar userId={id} size="300px" circle />
								<input
									type="file"
									name="file"
									placeholder="Profile Image"
									id="img_upload_input"
									onChange={(e) => uploadImage(e)}
									className="form-control form-group"
									hidden

								/>
								{/* <div id="img_preview_div" className="preview-images"></div> */}
								{/* 		<div className="cameraUpdate">
									<AddAPhotoIcon id="add_profile_img_icon" data-tip="add" onClick={OpenInput} />
								</div> */}


							</div>
							<div className="col-md-9 my-5">

								<div className="w-50 mx-auto">

									<div className="row">
										{/* <FaEdit className="edit_icon float-left" data-tip="edit" onClick={OpenEditName} /> */}
										<ReactTooltip />
										{/* 	<div data-tip="edit" onClick={OpenEditName}>
											<i className="fas fa-edit mt-3 mx-1" />
										</div> */}

										<h1 id="name_lable">{userProfile?.name}</h1>
										<input id="edit_name" className="hideInput" ></input>
										<FaSave id="save_name_icon" className="edit_icon hideIcon" data-tip="save"
											onClick={SaveNewName} />
										<FaWindowClose id="close_name_icon" className="edit_icon hideIcon" data-tip="close"
											onClick={CloseNameEdit} />
									</div>

									<div className="row">
										{/* 		<div data-tip="edit" onClick={OpenEditEmail}>
											<i className="fas fa-edit mt-1 mx-1"></i>
										</div> */}
										<h5 id="email_lable"></h5>
										<input id="edit_email" className="hideInput"></input>
										<FaSave id="save_email_icon" className="edit_icon hideIcon" data-tip="save"
											onClick={SaveNewEmail} />
										<FaWindowClose id="close_email_icon" className="edit_icon hideIcon" data-tip="close"
											onClick={CloseEmailEdit} />
									</div>

									<div className="row">
										{/* 		<div data-tip="edit" onClick={OpenEditAge}>
											<i className="fas fa-edit mt-1 mx-1"  ></i>
										</div>
 */}
										<h5 id="birthdate_label"></h5>
										<input type="date" id="edit_age" className="hideInput"></input>
										<FaSave id="save_age_icon" className="edit_icon hideIcon" data-tip="save"
											onClick={SaveNewAge} />
										<FaWindowClose id="close_age_icon" className="edit_icon hideIcon" data-tip="close"
											onClick={CloseAgeEdit} />
									</div>


									<div className="row">

										<h5 id="age_lable"></h5>

									</div>



									<div className="row">
										{/* 		<div data-tip="edit" onClick={OpenEditCountry}>
											<i className="fas fa-edit mt-1 mx-1"></i>
										</div> */}

										<h5 id="Country_lable"></h5>
										<input id="edit_Country" className="hideInput"></input>
										<FaSave id="save_country_icon" className="edit_icon hideIcon" data-tip="save"
											onClick={SaveNewCountry} />
										<FaWindowClose id="close_country_icon" className="edit_icon hideIcon" data-tip="close"
											onClick={CloseCountryEdit} />
									</div>


								</div>

								<div className="my-5">
									<div className="info_card float-right mx-3">
										<strong><i className="fas fa-basketball-ball"></i> Game:</strong>
										<div>info_card</div>
									</div>

									<div className="info_card float-right mx-3">
										<strong><i className="fas fa-gamepad"></i> Platform:</strong>
										<div>info_card</div>
									</div>

									<div className="info_card float-right mx-3">
										<strong><i className="fas fa-users"></i> Friends:</strong>
										<div id="number_of_friends">{NumberOfFriends}</div>
									</div>
								</div>



							</div>
						</div>
					</div>
				</div>


				<div className="container-md">
					<div className="row">
						<div className="col">
							<div id="member_bot_part">

								<div>
									<h3 className="float-left">Friends</h3>

									<div className="float-right">
										{/* 	<FaUserFriends id="add_friend_icon"
											data-tip="add / remove friend"
											onClick={() => SetisOpen(true)} /> */}
										<AllUsersModal
											open={isOpen}
											friendTo={(friend_id, action) => ActionFriendClicked(friend_id, action)}
											Profiles={all_profiles_list} MyProfile={userProfile}
											onClose={() => SetisOpen(false)} />
									</div>
								</div>
								<div className="clearfix"></div>
								<hr />



								<div id="FriendsComponent" className="row container" >
									<ul className="list-group list-group-horizontal-md room-list" style={{ listStyleType: 'none' }}>
										{Carouselitems.map((item, i) => <div key={i}>
											<a href={`/friend_profile/${item.id}`}>
												<RoomCard game={item.name} img={process.env.REACT_APP_SERVER_URL + '/api/profile/img/get_img/' + item.id} fallbackImg={'https://avatars.dicebear.com/api/bottts/' + item.id + '.svg'} />
											</a>
										</div>)}

										{/* <Carousel infiniteLoop useKeyboardArrows autoPlay>
							{Carouselitems}
						</Carousel> 
						
						
						*/}</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	)
}
