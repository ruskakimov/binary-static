const texts_json = {};
texts_json['ES'] = {"Day":"Día","Month":"Mes","Year":"Año","Sorry,_an_error_occurred_while_processing_your_request_":"Lo sentimos, ha ocurrido un error mientras se procesaba su petición.","Please_[_1]log_in[_2]_or_[_3]sign_up[_2]_to_view_this_page_":"Por favor [_1]inicie sesión[_2] o [_3]regístrese[_2] para ver esta página.","Open_a_Real_Account":"Abrir una cuenta real","Open_a_Financial_Account":"Abrir una cuenta financiera","Online":"En línea","Offline":"Fuera de línea","Connecting_to_server":"Conectando al servidor","Virtual_Account":"Cuenta virtual","Real_Account":"Cuenta real","Investment_Account":"Cuenta de inversión","Gaming_Account":"Cuenta de juego","Sunday":"Domingo","Monday":"Lunes","Tuesday":"Martes","Wednesday":"Miércoles","Thursday":"Jueves","Friday":"Viernes","Saturday":"Sábado","Su":"DO","Mo":"LU","Tu":"MA","We":"MI","Th":"JU","Fr":"VI","Sa":"SA","January":"Enero","February":"Febrero","March":"Marzo","April":"Abril","June":"Junio","July":"Julio","August":"Agosto","September":"Septiembre","October":"Octubre","November":"Noviembre","December":"Diciembre","Jan":"Ene","Apr":"Abr","Aug":"Ago","Dec":"Dic","Next":"Siguiente","Previous":"Anterior","Hour":"Hora","Minute":"Minuto","Time_is_in_the_wrong_format_":"La hora está en el formato equivocado.","Start_time":"Hora de comienzo","Entry_spot":"Punto de entrada","Purchase_Time":"Hora de compra","Exit_spot":"Punto de salida","End_time":"Hora de finalización","Charting_for_this_underlying_is_delayed":"Gráficos para este instrumento se muestran con retraso","year":"año","month":"mes","day":"día","days":"días","hours":"horas","minutes":"minutos","seconds":"segundos","Loss":"Pérdida","Profit":"Beneficios","Payout":"Pago","Stake":"Inversión","Duration":"Duración","End_Time":"Hora de finalización","Net_profit":"Beneficio Neto","Return":"Ganancias","Now":"Ahora","Contract_Confirmation":"Confirmación del contrato","Your_transaction_reference_is":"La referencia de su transacción es","Rise/Fall":"Alza/Baja","Higher/Lower":"Superior/Inferior","In/Out":"Dentro/Fuera","Matches/Differs":"Iguales/Diferentes","Even/Odd":"Par/Impar","Over/Under":"Encima/Debajo","Up/Down":"Arriba/Abajo","Ends_Between/Ends_Outside":"Finaliza dentro/Finaliza fuera","Touch/No_Touch":"Toque/Sin toque","Stays_Between/Goes_Outside":"Permanece dentro/Sale","Potential_Payout":"Pago potencial","Total_Cost":"Coste total","Potential_Profit":"Beneficios potenciales","View":"Ver","Tick":"Intervalo","Buy_price":"Precio de compra","Final_price":"Precio final","Long":"Largos","Short":"Cortos","Chart":"Gráfico","Portfolio":"Cartera","Explanation":"Explicación","Last_Digit_Stats":"Estadísticas del último dígito","Waiting_for_entry_tick_":"Esperando el tick de entrada.","Please_log_in_":"Por favor inicie sesión.","All_markets_are_closed_now__Please_try_again_later_":"Todos los mercados están cerrados ahora. Inténtelo más tarde.","Account_balance:":"Saldo de la cuenta:","Cryptocurrency":"Criptomonedas","Fiat_Currency":"Dinero fiat","Close":"Cerrar","Payoff":"Recompensa","Your_account_is_fully_authenticated_and_your_withdrawal_limits_have_been_lifted_":"Su cuenta está totalmente autenticada y su límite de retirada ha sido aumentado.","Your_withdrawal_limit_is_[_1]_[_2]_":"Su límite de retirada es [_1] [_2].","Your_withdrawal_limit_is_[_1]_[_2]_(or_equivalent_in_other_currency)_":"Su límite de retirada es [_1] [_2] (o el equivalente en otra divisa).","You_have_already_withdrawn_[_1]_[_2]_":"Usted ya retiró [_1] [_2].","You_have_already_withdrawn_the_equivalent_of_[_1]_[_2]_":"Usted ya retiró el equivalente a [_1] [_2].","Therefore_your_current_immediate_maximum_withdrawal_(subject_to_your_account_having_sufficient_funds)_is_[_1]_[_2]_":"Por lo tanto, la cantidad máxima que puede retirar de forma inmediata (sujeta a la existencia de fondos suficientes en su cuenta) es [_1] [_2].","Therefore_your_current_immediate_maximum_withdrawal_(subject_to_your_account_having_sufficient_funds)_is_[_1]_[_2]_(or_equivalent_in_other_currency)_":"Por lo tanto, la cantidad máxima que puede retirar de forma inmediata (sujeta a la existencia de fondos suficientes en su cuenta) es [_1] [_2] (o su equivalente en otra divisa).","Your_[_1]_day_withdrawal_limit_is_currently_[_2]_[_3]_(or_equivalent_in_other_currency)_":"Su [_1] límite diario para retirar dinero es actualmente [_2] [_3] (o el equivalente en otra divisa).","You_have_already_withdrawn_the_equivalent_of_[_1]_[_2]_in_aggregate_over_the_last_[_3]_days_":"Usted ya retiró un total equivalente a [_1] [_2]  en los últimos [_3] días.","Contracts_where_the_barrier_is_the_same_as_entry_spot_":"Contratos en que la barrera es igual al punto de entrada.","Contracts_where_the_barrier_is_different_from_the_entry_spot_":"Contratos en que la barrera es diferente al punto de entrada.","ATM":"Cajero automático","Duration_up_to_7_days":"Duración hasta 7 días","Duration_above_7_days":"Duración superior a 7 días","Major_Pairs":"Pares mayores","This_field_is_required_":"Este campo es obligatorio.","Please_accept_the_terms_and_conditions_":"Por favor acepte los términos y condiciones.","Only_[_1]_are_allowed_":"Se permiten solo [_1].","letters":"letras","numbers":"números","space":"espacio","Sorry,_an_error_occurred_while_processing_your_account_":"Lo sentimos, ha ocurrido un error mientras se procesaba su cuenta.","Female":"Mujer","Male":"Hombre","Please_select_a_country":"Seleccione un país","Please_confirm_that_all_the_information_above_is_true_and_complete_":"Por favor, confirme que toda la información anterior es verdadera y está completa.","The_email_address_provided_is_already_in_use__If_you_forgot_your_password,_please_try_our_<a_href=\"[_1]\">password_recovery_tool</a>_or_contact_our_customer_service_":"La dirección de correo electrónico proporcionada ya está en uso. Si olvidó su contraseña, pruebe nuestra <a href=\"[_1]\">herramienta de recuperación de contraseña</a> o póngase en contacto con nuestro servicio de atención al cliente.","Password_should_have_lower_and_uppercase_letters_with_numbers_":"La contraseña debe tener letras minúsculas y mayúsculas con números.","Password_is_not_strong_enough_":"La contraseña no es lo suficientemente fuerte.","Your_session_duration_limit_will_end_in_[_1]_seconds_":"El límite de duración de su sesión terminará en [_1] segundos.","Please_select":"Seleccione","Minimum_of_[_1]_characters_required_":"Mínimo de [_1] caracteres requeridos.","Please_confirm_that_you_are_not_a_politically_exposed_person_":"Por favor, confirme que no es una persona políticamente expuesta.","Asset":"Activo","Opens":"Abre","Closes":"Cierra","Settles":"Liquida","Upcoming_Events":"Próximos eventos","Closes_early_(at_21:00)":"Cierra temprano (a las 21:00)","Closes_early_(at_18:00)":"Cierra temprano (a las 18:00)","Christmas_Day":"Día de Navidad","Fridays":"Viernes","Please_select_a_payment_agent":"Seleccione un agente de pago","The_Payment_Agent_facility_is_currently_not_available_in_your_country_":"Los agentes de pagos no están disponibles actualmente para su país.","Invalid_amount,_minimum_is":"Monto inválido, el mínimo es","Invalid_amount,_maximum_is":"Monto invalido. El máximo es","Your_request_to_withdraw_[_1]_[_2]_from_your_account_[_3]_to_Payment_Agent_[_4]_account_has_been_successfully_processed_":"Su solicitud de retirada de [_1] [_2] de su cuenta [_3] al agente de pagos [_4] se ha procesado correctamente.","New_token_created_":"Un token nuevo ha sido creado.","The_maximum_number_of_tokens_([_1])_has_been_reached_":"El máximo número de tokens ([_1]) ha sido alcanzado.","Name":"Nombre","Last_Used":"Último usado","Never_Used":"Nunca usado","Delete":"Eliminar","Are_you_sure_that_you_want_to_permanently_delete_the_token":"¿Está seguro de querer eliminar definitivamente el token?","Guide":"Guía","Finish":"Terminar","Step":"Paso","Select_your_market":"Seleccione su mercado","Select_your_underlying_asset":"Seleccione el activo subyacente","Select_your_trade_type":"Seleccione el tipo de contrato","Adjust_trade_parameters":"Ajustar parámetros de comercio","Predict_the_direction<br_/>and_purchase":"Prediga la dirección<br /> y compre","Sorry,_this_feature_is_available_to_virtual_accounts_only_":"Lo sentimos, esta característica está disponible solo para cuentas virtuales.","[_1]_[_2]_has_been_credited_into_your_virtual_account:_[_3]_":"[_1] [_2] se han acreditado en su cuenta de dinero virtual [_3].","years":"años","months":"meses","Your_changes_have_been_updated_":"Sus cambios se han actualizado.","Please_enter_an_integer_value":"Ingrese un valor entero","Session_duration_limit_cannot_be_more_than_6_weeks_":"El límite de la duración de la sesión no puede ser superior a 6 semanas.","You_did_not_change_anything_":"No ha cambiado nada.","Please_select_a_valid_date_":"Seleccione una fecha válida.","Please_select_a_valid_time_":"Seleccione una hora válida.","Time_out_cannot_be_in_the_past_":"El tiempo de inactividad no puede ser en el pasado.","Time_out_must_be_after_today_":"El tiempo de inactividad debe ser después de hoy.","Time_out_cannot_be_more_than_6_weeks_":"El tiempo de inactividad no puede ser mayor a seis semanas.","Exclude_time_cannot_be_less_than_6_months_":"El tiempo de exclusión no puede ser menor a 6 meses.","Exclude_time_cannot_be_for_more_than_5_years_":"El tiempo de exclusión no puede ser mayor a 5 años.","Resale_not_offered":"No se ofrece reventa","Date":"Fecha","Action":"Acción","Contract":"Contrato","Sale_Date":"Fecha de venta","Sale_Price":"Precio venta","Total_Profit/Loss":"Beneficios/perdidas totales","Your_account_has_no_trading_activity_":"Su cuenta no tiene actividad comercial.","Today":"Hoy","Details":"detalles","Sell":"Venta","Buy":"Comprar","This_feature_is_not_relevant_to_virtual-money_accounts_":"Esta característica no es relevante para cuentas de dinero virtual.","Japan":"Japón","Questions":"Preguntas","There_was_some_invalid_character_in_an_input_field_":"Había un carácter no válido en el campo de entrada.","Please_follow_the_pattern_3_numbers,_a_dash,_followed_by_4_numbers_":"Por favor, siga el patrón de 3 números y un guión seguido de 4 números.","You_need_to_finish_all_20_questions_":"Tiene que terminar todas las 20 preguntas.","Weekday":"Día de la semana","Please_check_the_above_form_for_pending_errors_":"Por favor, compruebe el formulario anterior para ver si hay errores pendientes.","Asian_Up":"Asiáticas arriba","Asian_Down":"Asiáticas abajo","Digit_Matches":"Dígito coincide","Digit_Differs":"Dígito difiere","Digit_Odd":"Dígito impar","Digit_Even":"Dígito par","Digit_Over":"Dígito sobre","Digit_Under":"Dígito por debajo","[_1]_[_2]_payout_if_[_3]_is_strictly_higher_than_or_equal_to_Barrier_at_close_on_[_4]_":"Pago de [_2] [_1] si [_3] es estrictamente superior o igual a la barrera al momento del cierre en [_4].","[_1]_[_2]_payout_if_[_3]_is_strictly_lower_than_Barrier_at_close_on_[_4]_":"Pago de [_2] [_1] si [_3] es estrictamente inferior a la barrera al momento del cierre en [_4].","[_1]_[_2]_payout_if_[_3]_does_not_touch_Barrier_through_close_on_[_4]_":"Pago de [_1] [_2] si [_3] no toca la barrera hasta el cierre en [_4].","[_1]_[_2]_payout_if_[_3]_touches_Barrier_through_close_on_[_4]_":"Pago de [_2] [_1] si [_3] toca la barrera antes del cierre en [_4].","[_1]_[_2]_payout_if_[_3]_ends_on_or_between_low_and_high_values_of_Barrier_at_close_on_[_4]_":"Pago de [_2] [_1] si [_3] termina en o entre el valor mínimo y el máximo de la barrera al cierre en [_4].","[_1]_[_2]_payout_if_[_3]_ends_outside_low_and_high_values_of_Barrier_at_close_on_[_4]_":"Pago de [_2] [_1] si [_3] termina fuera del valor mínimo y máximo de la barrera al cierre en [_4].","[_1]_[_2]_payout_if_[_3]_stays_between_low_and_high_values_of_Barrier_through_close_on_[_4]_":"Pago de [_2] [_1] si [_3] no sale del valor mínimo y máximo de la barrera antes del cierre en [_4].","[_1]_[_2]_payout_if_[_3]_goes_outside_of_low_and_high_values_of_Barrier_through_close_on_[_4]_":"Pago de [_2] [_1] si [_3] sale del valor mínimo y máximo de la barrera antes del cierre en [_4].","Higher":"Superior","Higher_or_equal":"Mayor o igual","Touches":"Toca","Does_Not_Touch":"No toque","Ends_Between":"Finaliza entre","Ends_Outside":"Finaliza fuera","Stays_Between":"Permanece dentro","Goes_Outside":"Sale fuera","All_barriers_in_this_trading_window_are_expired":"Todos los límites en esta ventana de comercio han caducado","Remaining_time":"Tiempo restante","Market_is_closed__Please_try_again_later_":"El mercado está cerrado. Inténtelo más tarde.","Sorry,_your_account_is_not_authorised_for_any_further_contract_purchases_":"Lo sentimos, su cuenta no está autorizada para continuar con la compra de contratos.","Payout_per_lot_=_1,000":"Pago por lote = 1.000","Percentage":"Porcentaje","Digit":"Dígito","Amount":"Monto","Deposit":"Depósito","Your_request_to_transfer_[_1]_[_2]_from_[_3]_to_[_4]_has_been_successfully_processed_":"Su solicitud de transferencia [_1] [_2] de [_3] a [_4] ha sido procesada exitosamente.","Date_and_Time":"Fecha y Hora","Browser":"Navegador","IP_Address":"Dirección IP","Status":"Estado","Successful":"Exitoso","Failed":"Fallado","Your_account_has_no_Login/Logout_activity_":"Su cuenta no tiene actividad de accesos/cierres de sesión.","Please_enter_a_number_between_[_1]_":"Por favor, introduzca un número entre [_1].","[_1]_days_[_2]_hours_[_3]_minutes":"[_1] días [_2] horas [_3] minutos","Your_trading_statistics_since_[_1]_":"Las estadísticas de sus transacciones desde [_1].","Unlock_Cashier":"Desbloquear cajero","Your_cashier_is_locked_as_per_your_request_-_to_unlock_it,_please_enter_the_password_":"Su cajero está bloqueado según su petición - para desbloquearlo, por favor introduzca la contraseña.","Lock_Cashier":"Bloquear cajero","An_additional_password_can_be_used_to_restrict_access_to_the_cashier_":"Se puede utilizar una contraseña adicional para restringir el acceso al cajero.","Update":"Actualizar","Sorry,_you_have_entered_an_incorrect_cashier_password":"Lo sentimos, ingresó una contraseña de cajero incorrecta","Start_Time":"Hora de comienzo","Entry_Spot":"Punto de entrada","Low_Barrier":"Barrera Inferior","High_Barrier":"Barrera Superior","High_Barrier_([_1])":"Barrera Alta ([_1])","Barrier_([_1])":"Límite ([_1])","This_contract_won":"Este contrato ganó","This_contract_lost":"Este contrato perdió","Spot":"Precio actual del mercado","Barrier":"Límite","Target":"Objetivo","Equals":"Equivale","Not":"No","Description":"Descripción","Credit/Debit":"Crédito/débito","Balance":"Saldo","Purchase_Price":"Precio de compra","Profit/Loss":"Ganado/Perdido","Contract_Information":"Información del Contrato","Contract_Expiry":"Vencimiento del Contrato","Contract_Sold":"Contrato Vendido","Current":"Actual","Open":"Abierto","Closed":"Cerrado","Contract_has_not_started_yet":"El contrato no ha comenzado todavía","Price":"Precio","Spot_Time":"Hora del precio a la vista","Spot_Time_(GMT)":"Hora del precio a la vista (GTM)","Current_Time":"Hora actual","Exit_Spot_Time":"Tiempo de Punto de Salida","Exit_Spot":"Punto de salida","Indicative":"Indicativo","There_was_an_error":"Hubo un error","Sell_at_market":"Vender al precio actual","You_have_sold_this_contract_at_[_1]_[_2]":"Usted ha vendido este contrato en [_1] [_2]","Your_transaction_reference_number_is_[_1]":"El número de referencia de su transacción es [_1]","Note":"Nota","Contract_will_be_sold_at_the_prevailing_market_price_when_the_request_is_received_by_our_servers__This_price_may_differ_from_the_indicated_price_":"El contrato se venderá al precio vigente en el mercado en el momento de la recepción de la solicitud de venta por nuestros servidores. Este precio puede ser diferente del precio indicado.","Contract_ID":"ID del Contrato","Contract_Type":"Tipo de contrato","Remaining_Time":"Tiempo Restante","Barrier_Change":"Cambio de Límite","Audit":"Auditoría","Audit_Page":"Página de auditoría","Contract_Starts":"Contrato empieza","Contract_Ends":"El contrato termina","Start_Time_and_Entry_Spot":"Hora de inicio y punto de entrada","Exit_Time_and_Exit_Spot":"Finalización del contrato y Precio de salida","Please_select_a_value":"Seleccione un valor","You_have_not_granted_access_to_any_applications_":"Usted no ha concedido acceso a ninguna aplicación.","Permissions":"Permisos","Never":"Nunca","Revoke_access":"Revocar el acceso","Are_you_sure_that_you_want_to_permanently_revoke_access_to_the_application":"¿Está seguro de que desea revocar permanentemente el acceso a la aplicación?","Transaction_performed_by_[_1]_(App_ID:_[_2])":"Transacción realizada por [_1] (ID de la aplicación: [_2])","Admin":"Administrador","Read":"Leer","Payments":"Pagos","[_1]_Please_click_the_link_below_to_restart_the_password_recovery_process_":"[_1] Haga clic en el siguiente enlace para reiniciar el proceso de recuperación de contraseña.","Your_password_has_been_successfully_reset__Please_log_into_your_account_using_your_new_password_":"Su contraseña se ha restablecido. Por favor, inicie sesión en su cuenta utilizando su nueva contraseña.","Please_check_your_email_for_the_password_reset_link_":"Por favor, verifique su correo electrónico para obtener el enlace de restablecimiento de su contraseña.","details":"detalles","Withdraw":"Retirar","Insufficient_balance_":"Saldo insuficiente.","There_was_a_problem_accessing_the_server_":"Hubo un problema al acceder al servidor.","There_was_a_problem_accessing_the_server_during_purchase_":"Hubo un problema al acceder al servidor durante la compra.","Only_letters,_numbers,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Se permite sólo el uso de letras, números, espacios, guiones, puntos y apóstrofes.","Only_letters,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Se permite sólo el uso de letras, espacios, guiones, puntos y apóstrofes.","Only_letters,_numbers,_and_hyphen_are_allowed_":"Se permiten sólo letras, números y guiones.","Only_numbers,_space,_and_hyphen_are_allowed_":"Se permiten sólo números, espacios y guiones.","Only_numbers_and_spaces_are_allowed_":"Se permiten sólo números y espacios.","Only_letters,_numbers,_space,_and_these_special_characters_are_allowed:_-___'_#_;_:_(_)_,_@_/":"Se permite sólo el uso de letras, números, espacios y los siguientes caracteres especiales: - . ' # ; : ( ) , @ /","The_two_passwords_that_you_entered_do_not_match_":"Las dos contraseñas introducidas no coinciden.","[_1]_and_[_2]_cannot_be_the_same_":"[_1] y [_2] no pueden ser iguales.","The_password_you_entered_is_one_of_the_world's_most_commonly_used_passwords__You_should_not_be_using_this_password_":"La contraseña que ingresada es una de las contraseñas más utilizadas en el mundo. Se recomienda no utilizar esta contraseña.","Hint:_it_would_take_approximately_[_1][_2]_to_crack_this_password_":"Pista: se necesitaría aproximadamente [_1][_2] para descifrar esta contraseña.","Congratulations!_Your_[_1]_Account_has_been_created_":"¡Felicidades! Su cuenta [_1] ha sido creada.","The_main_password_of_account_number_[_1]_has_been_changed_":"La contraseña principal de la cuenta nº [_1] ha sido modificada.","[_1]_deposit_from_[_2]_to_account_number_[_3]_is_done__Transaction_ID:_[_4]":"[_1] depósito desde [_2] a la cuenta número [_3] se ha realizado con éxito. ID de transacción: [_4]","[_1]_withdrawal_from_account_number_[_2]_to_[_3]_is_done__Transaction_ID:_[_4]":"Retiro de [_1] desde la cuenta número [_2] a [_3] se ha realizado con éxito. ID de transacción: [_4]","Sorry,_this_feature_is_not_available_in_your_jurisdiction_":"Lo sentimos, esta función no está disponible en su jurisdicción.","Current_password":"Contraseña actual","New_password":"Contraseña nueva","Demo_Standard":"Demo estándar","Standard":"Estándar","Demo_Advanced":"Demo avanzada","Advanced":"Avanzado","Demo_Volatility_Indices":"Demo de índices de volatilidad","Real_Standard":"Cuenta real estándar","Real_Advanced":"Cuenta real avanzada","Change_Password":"Cambiar contraseña","Demo_Accounts":"Cuentas de prueba","Real-Money_Accounts":"Cuentas de dinero real","[_1]_Account_[_2]":"Cuenta [_1] [_2]","Max":"Máximo","Current_balance":"Saldo actual","[_1]Authenticate_your_account[_2]_now_to_take_full_advantage_of_all_payment_methods_available_":"[_1]Autentifique su cuenta[_2] ahora para aprovechar al máximo todos los métodos de pago disponibles.","Please_complete_the_[_1]financial_assessment_form[_2]_to_lift_your_withdrawal_and_trading_limits_":"Por favor complete el [_1]formulario de evaluación financiera[_2] para aumentar el límite de retiro y operación de su cuenta.","Please_[_1]complete_your_account_profile[_2]_to_lift_your_withdrawal_and_trading_limits_":"Por favor \"complete su perfil\" para aumentar el límite de retiro y negociación de su cuenta.","Please_[_1]accept_the_updated_Terms_and_Conditions[_2]_to_lift_your_withdrawal_and_trading_limits_":"Por favor [_1]acepte los términos y condiciones actualizados[_2] para aumentar el límite de retiro y negociación de su cuenta.","Connection_error:_Please_check_your_internet_connection_":"Error de conexión: por favor, compruebe su conexión a internet.","[_1]_requires_your_browser's_web_storage_to_be_enabled_in_order_to_function_properly__Please_enable_it_or_exit_private_browsing_mode_":"[_1] requiere que el almacenamiento web de su navegador esté activo para funcionar correctamente. Por favor, habilítelo o salga del modo de navegación privada.","Bid":"Oferta","Closed_Bid":"Cerrar oferta","Create":"Crear","Commodities":"Materias primas","Indices":"Índices","Stocks":"Acciones","Volatility_Indices":"Índices de Volatilidad","Please_choose_a_currency":"Por favor elija una moneda","Create_Account":"Crear cuenta","Accounts_List":"Lista de cuentas","[_1]_Account":"Cuenta [_1]","Gaming":"Apuestas","Counterparty":"Contraparte","Ether":"Ethereum","Ether_Classic":"Ethereum Classic","File_([_1])_size_exceeds_the_permitted_limit__Maximum_allowed_file_size:_3MB":"Tamaño del archivo ([_1]) excede el límite permitido. Tamaño máximo permitido: 3MB","ID_number_is_required_for_[_1]_":"La cédula de identidad es requerida para [_1].","Only_letters,_numbers,_space,_underscore,_and_hyphen_are_allowed_for_ID_number_":"Se permite sólo el uso de letras, números, espacios, guión bajo y guiones para la cédula de identidad.","Expiry_date_is_required_for_[_1]_":"Fecha de vencimiento es requerida por [_1].","ID_card":"Cédula de identidad","Driving_licence":"Licencia de conducir","Front_Side":"Parte delantera","Reverse_Side":"Reverso","Front_and_reverse_side_photos_of_[_1]_are_required_":"Fotos de la parte delantera y reverso de [_1] son necesarias.","[_1]Your_Proof_of_Identity_or_Proof_of_Address[_2]_did_not_meet_our_requirements__Please_check_your_email_for_further_instructions_":"[_1]Su comprobante de identidad o de domicilio[_2] no cumple nuestros requisitos. Por favor, revise su correo electrónico para más instrucciones.","Following_file(s)_were_already_uploaded:_[_1]":"Los siguientes archivos ya se habían subido: [_1]"};