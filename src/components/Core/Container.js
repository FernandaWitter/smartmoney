import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/colors";
import { Text } from "@react-navigation/elements";
import Icon from "@react-native-vector-icons/material-icons";

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
                            onPress={() => {onPressActionButton && onPressActionButton()}}>
                            <Icon name='insert-chart' style={styles.actionButtonIcon}/>
                            <Text style={styles.actionButtonText}>{actionButtonText}</Text>
                        </TouchableOpacity>    
                    }           
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.asphalt,
        borderColor: '#87c5fb45',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 8,
    },
    title: {
        color: Colors.white,
        fontSize: 18,
        marginBottom: 5,
    },
    actionLabel: {
        flex: 1,
        fontSize:16,
        color:Colors.champagneDark,
    }, 
    actionsContainer:{
        flexDirection:'row'
    }, 
    actionButton: {
        flexDirection:'row'
    },
    actionButtonText:{
        flexGrow: 0,
        fontSize:16,
        color: Colors.champagneDark,
    },
    actionButtonIcon:{
        color: Colors.champagneDark,
        flexGrow:0,
        fontSize: 17,
        marginRight: 2,
        marginTop: 2,
    }
})

export default Container;