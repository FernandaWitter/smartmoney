import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@react-native-vector-icons/material-icons";

import Colors from "../../styles/colors";

const Container = ({title, actionLabelText = '', actionButtonText, onPressActionButton, showMore, limitHeight = true, children}) => {
    return(
        <View style={[styles.container, limitHeight ? {maxHeight:400} : {paddingBottom: 30}]}>
            <Text style={styles.title}>{title}</Text>
            {children}
            {showMore &&
                <View style={styles.actionsContainer}>
                    <Text style={styles.actionLabel}>{actionLabelText}</Text>
                    {onPressActionButton && 
                        <TouchableOpacity style={styles.actionButton}
                            onPress={() => {onPressActionButton && onPressActionButton();}}>
                            <Icon name='insert-chart' style={styles.actionButtonIcon}/>
                            <Text style={styles.actionButtonText}>{actionButtonText}</Text>
                        </TouchableOpacity>    
                    }           
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.asphalt,
        borderColor: '#87c5fb45',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        bottom: 5,
        margin: 5,
        padding: 8,
    },
    title: {
        color: Colors.white,
        fontSize: 18,
        marginBottom: 5,
    },
    actionsContainer:{
        flexDirection:'row',
    }, 
    actionLabel: {
        flex: 1,
        fontSize:16,
        color:Colors.champagneDark,
    }, 
    actionButton: {
        flexDirection:'row',
    },
    actionButtonIcon:{
        color: Colors.champagneDark,
        flexGrow:0,
        fontSize: 17,
        marginRight: 2,
        marginTop: 2,
    },
    actionButtonText:{
        color: Colors.champagneDark,
        flexGrow: 0,
        fontSize:16,
    },
});

export default Container;