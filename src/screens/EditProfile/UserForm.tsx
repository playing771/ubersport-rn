import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { withEditUserInfoQuery } from '../../api/user/withUserInfoQuery';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ULoader from '../../components/ULoader/index';
import UTextInput from '../../components/UTextInput/index';
import SportsList from '../../components/SportsList';
import EditGender from '../../components/Buttons/Switch';
import SubmitButton from '../../components/SubmitButton';
import { EDIT_USER_MUTATION, IEditProfileVariables } from './gql';
import handleApoloError from '../../other/handleApoloError';
import AvatarSelect from './AvatarSelect';

const UserForm = withEditUserInfoQuery(({ data }) => {
	const { loading, error, getUser } = data;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [nickname, setNickname] = useState('');
	const [sports, setSports] = useState<number[]>([]);

	useEffect(() => {
		if (getUser) {
			setFirstName(getUser.firstName);
			setLastName(getUser.lastName);
			setNickname(getUser.nickname);
			setSports(getUser.favoriteSports.map(sport => sport.id));
		}
	}, [getUser]);

	const changeFirstNameHandle = (text: string) => {
		setFirstName(text);
	};

	const changeLastNameHandle = (text: string) => {
		setLastName(text);
	};

	const changeNicknameHandle = (text: string) => {
		setNickname(text);
	};

	const changeSportsHandle = (sportIds: number[]) => {
		setSports(sportIds);
	};

	if (!getUser) {
		return <ULoader />;
	}

	const updateVariables: IEditProfileVariables = {
		id: getUser.id,
		userInput: {
			firstName,
			lastName,
			nickname,
			favouriteSportIds: sports
		}
	};

	console.log('EDIT PROFILE');

	return (
		<>
			<KeyboardAwareScrollView style={styles.mainContainer}>
				<ULoader loading={loading || !getUser} />
				<AvatarSelect />
				<View
					style={{ backgroundColor: 'white', paddingHorizontal: 24 }}
				>
					<UTextInput
						label="Имя"
						value={firstName}
						onChange={changeFirstNameHandle}
					/>
					<UTextInput
						label="Фамилия"
						value={lastName}
						onChange={changeLastNameHandle}
					/>
					<UTextInput
						label="Никнейм"
						value={nickname}
						onChange={changeNicknameHandle}
					/>
					<EditGender options={['Мужской', 'Женский']} label="Пол" />
					<Text style={styles.sportsListTitle}>
						Избранные виды спорта
					</Text>
					<SportsList
						onChange={changeSportsHandle}
						style={styles.sportsList}
					/>
				</View>
			</KeyboardAwareScrollView>
			<SubmitButton
				gql={EDIT_USER_MUTATION}
				variables={updateVariables}
				title="Сохранить"
				onError={handleApoloError}
			/>
		</>
	);
});

const styles = StyleSheet.create({
	mainContainer: {
		// paddingHorizontal: 24,
		marginBottom: 48,
		backgroundColor: '#F1F1F5'
	},
	sportsListTitle: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		color: '#404F7A',
		paddingBottom: 12,
		paddingTop: 24
	},
	sportsList: {
		// paddingTop:
	}
});

export default UserForm;
