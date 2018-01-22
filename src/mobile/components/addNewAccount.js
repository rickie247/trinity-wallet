import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { width, height } from '../util/dimensions';
import { translate } from 'react-i18next';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    titleText: {
        color: 'white',
        fontFamily: 'Lato-Regular',
        fontSize: width / 23,
        backgroundColor: 'transparent',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height / 50,
        justifyContent: 'flex-start',
        width,
        paddingHorizontal: width / 15,
    },
    icon: {
        width: width / 22,
        height: width / 22,
        marginRight: width / 25,
    },
    backIcon: {
        width: width / 28,
        height: width / 28,
        marginRight: width / 20,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

class AddNewAccount extends Component {
    static propTypes = {
        addExistingSeed: PropTypes.func.isRequired,
        addNewSeed: PropTypes.func.isRequired,
        backPress: PropTypes.func.isRequired,
        textColor: PropTypes.object.isRequired,
    };

    onNewSeedPress() {
        this.props.addNewSeed();
    }

    onExistingSeedPress() {
        this.props.addExistingSeed();
    }

    render() {
        const { t, textColor, secondaryBackgroundColor, arrowLeftImagePath, addImagePath, keyImagePath } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flex: 9, justifyContent: 'flex-start' }}>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={(event) => this.onExistingSeedPress()}
                            hitSlop={{ top: height / 55, bottom: height / 55, left: width / 55, right: width / 55 }}
                        >
                            <View style={styles.item}>
                                <Image source={keyImagePath} style={styles.icon} />
                                <Text style={[styles.titleText, textColor]}>{t('useExistingSeed')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={(event) => this.onNewSeedPress()}
                            hitSlop={{ top: height / 55, bottom: height / 55, left: width / 55, right: width / 55 }}
                        >
                            <View style={styles.item}>
                                <Image source={addImagePath} style={styles.icon} />
                                <Text style={[styles.titleText, textColor]}>{t('createNewSeed')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 7 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={(event) => this.props.backPress()}
                        hitSlop={{ top: height / 55, bottom: height / 55, left: width / 55, right: width / 55 }}
                    >
                        <View style={styles.item}>
                            <Image source={arrowLeftImagePath} style={styles.backIcon} />
                            <Text style={[styles.titleText, textColor]}>{t('global:backLowercase')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default translate(['addNewAccount', 'global'])(AddNewAccount);
