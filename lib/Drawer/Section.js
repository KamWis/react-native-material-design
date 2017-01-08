import React, {Component, PropTypes} from "react";
import {View, Text, TouchableNativeFeedback} from "react-native";
import Icon from '../Icon';
import Ripple from '../polyfill/Ripple';
import { TYPO } from '../config';
import { isCompatible } from '../helpers';

export default class Section extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string.isRequired,
            label: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            active: PropTypes.bool,
            disabled: PropTypes.bool
        }))
    };

    renderRow = (item, index, color, iconColor) => {
        return (
            <View
                key={index}
                style={styles.item}
            >
                {item.icon &&
                    <Icon
                        name={item.icon}
                        color={iconColor}
                        size={22}
                    />
                }
                <View style={styles.value}>
                    <Text style={[TYPO.paperFontBody2, { color }]}>
                        {item.value}
                    </Text>
                </View>
                {item.label &&
                    <View style={styles.label}>
                        <Text style={[TYPO.paperFontBody2, { color }]}>
                            {item.label}
                        </Text>
                    </View>
                }
            </View>
        );
    };

    render() {
        const { theme, title, items } = this.props;

        const textStyleMap = {
            light: {
                'default': 'rgba(0,0,0,.87)',
                disabled: 'rgba(0,0,0,.38)'
            },
            dark: {
                'default': '#ffffff',
                disabled: 'rgba(255,255,255,.30)',
                faded: 'rgba(255,255,255,.54)'
            }
        };

        const subheaderStyleMap = {
            light: 'rgba(0,0,0,.54)',
            dark: 'rgba(255,255,255,.70)',
        };

        const activeStyleMap = {
            light: '#f5f5f5',
            dark: '#212121',
        };

        const TEXT_COLOR = textStyleMap[theme]['default'];
        const ICON_COLOR = textStyleMap[theme]['faded'];
        const SUB_TEXT_COLOR = subheaderStyleMap[theme];
        const ACTIVE_COLOR = activeStyleMap[theme];

        return (
            <View style={styles.section}>
                {title &&
                    <View style={[styles.subheader, styles.item]}>
                        <Text style={[TYPO.paperFontBody2, { color: SUB_TEXT_COLOR }]}>
                            {title}
                        </Text>
                    </View>
                }
                {items && items.map((item, i) => {
                    if (item.disabled) {
                        return this.renderRow(item, i, textStyleMap[theme]['disabled'], ICON_COLOR);
                    }

                    if (!isCompatible('TouchableNativeFeedback')) {
                        return (
                            <Ripple
                                key={i}
                                rippleColor="rgba(153,153,153,.4)"
                                onPress={item.onPress}
                                onLongPress={item.onLongPress}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: item.active ? ACTIVE_COLOR : null
                                }}
                            >
                                {this.renderRow(item, i, TEXT_COLOR, ICON_COLOR)}
                            </Ripple>
                        );
                    }

                    return (
                        <TouchableNativeFeedback
                            key={i}
                            background={TouchableNativeFeedback.Ripple('rgba(153,153,153,.4)')}
                            onPress={item.onPress}
                            onLongPress={item.onLongPress}
                        >
                            <View style={item.active ? { backgroundColor: ACTIVE_COLOR } : {}}>
                                {this.renderRow(item, i, TEXT_COLOR, ICON_COLOR)}
                            </View>
                        </TouchableNativeFeedback>
                    );
                })}
            </View>
        );
    }
}

const styles = {
    section: {
        marginTop: 8
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
        paddingVertical: 13
    },
    subheader: {
        flex: 1,
    },
    value: {
        paddingLeft: 32,
        marginTop: -4
    },
    label: {
        paddingRight: 16
    }
};