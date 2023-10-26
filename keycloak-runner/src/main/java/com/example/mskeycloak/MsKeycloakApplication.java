package com.example.mskeycloak;

import com.example.mskeycloak.clients.KeycloakClient;
import com.example.mskeycloak.models.User;
import com.example.mskeycloak.services.*;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.ClientScopeRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.*;

@SpringBootApplication
public class MsKeycloakApplication implements CommandLineRunner {

	@Value("${keycloak.serverUrl}")
	private String serverUrl;
	@Value("${keycloak.admin.realm}")
	private String adminRealm;
	@Value("${keycloak.username}")
	private String username;
	@Value("${keycloak.password}")
	private String password;
	@Value("${keycloak.admin.clientId}")
	private String adminClientId;
	@Value("${keycloak.defaultUrl}")
	private String defaultUrl;
	@Value("${keycloak.kc-resqpet-auth.fe-resqpet.client}")
	private String resqpetClient;
	@Value("${keycloak.kc-resqpet-auth.fe-resqpet.clientSecret}")
	private String resqpetClientSecret;
	@Value("${spring.application.name}")
	private String realmName;

	public static void main(String[] args) {
		SpringApplication.run(MsKeycloakApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

//		Constantes
		String RESQPET_REALM = realmName;
//		String RESQPET_REALM = "kc-resqpet-auth";
		String CLIENT_ROLE = "USER";
		String ADMIN_ROLE = "ADMIN";
		String REALM_MANAGEMENT_CLIENT = "realm-management";
		String VIEW_USERS_ROLE = "view-users";
		String GROUPS_LABEL = "groups";
//		String GROUPS_VALUE = "PROVIDERS";

//		Instancia del cliente de Keycloak
		KeycloakClient client = new KeycloakClient();
		Keycloak keycloak = client.buildClient(serverUrl, adminRealm, username, password, adminClientId);

//		Creación de reino
		Realms realms = new Realms(keycloak);
		realms.createRealm(RESQPET_REALM);

		RealmResource realmResource = keycloak.realm(RESQPET_REALM);
		UsersResource usersResource = realmResource.users();

		Clients clients = new Clients(keycloak);
		Roles roles = new Roles(keycloak);
		ClientScopes scopes = new ClientScopes(keycloak);
		Users users = new Users(keycloak);
//		Groups groups = new Groups(keycloak);

//		Creación de cliente scope para los grupos
		ClientScopeRepresentation groupsClientScope = scopes.createClientScope(GROUPS_LABEL, RESQPET_REALM);

//		Creación de los clientes
		String resqpetClientId = clients.createClient(resqpetClient, RESQPET_REALM,resqpetClientSecret, defaultUrl, groupsClientScope);

//		Creacion de los grupos y rol base
//		groups.createGroup(GROUPS_VALUE, RESQPET_REALM);
		roles.createRole(CLIENT_ROLE, RESQPET_REALM, resqpetClientId);
		roles.createRole(ADMIN_ROLE, RESQPET_REALM, resqpetClientId);

//		ClientRepresentation billsClient = keycloak.realm(RESQPET_REALM).clients().findByClientId("bills-ms").get(0);


//		Creación de usuarios

//		Modificación usuario por default para tener permisos de view-users
//		Obtenemos usuario default
		UserRepresentation serviceAccountResqpet = keycloak.realm(RESQPET_REALM).clients().get(resqpetClientId).getServiceAccountUser();
//		Obtenemos el Id del cliente de realm management
		String realmManagementClientId = keycloak.realm(RESQPET_REALM).clients().findByClientId(REALM_MANAGEMENT_CLIENT).get(0).getId();
//		Obtenemos el role de view-useres
		RoleRepresentation viewUsersRole = keycloak.realm(RESQPET_REALM).clients().get(realmManagementClientId).roles().get(VIEW_USERS_ROLE).toRepresentation();
//		Creamos el recurso de usuarios para el usuario que queremos modificar
		UserResource userResource = keycloak.realm(RESQPET_REALM).users().get(serviceAccountResqpet.getId());
//		Creamos el recurso de roles
		RoleScopeResource roleResource = userResource.roles().clientLevel(realmManagementClientId);
//		Adicionamos role de view-users y actualizamos usuario
		roleResource.add(Collections.singletonList(viewUsersRole));
		userResource.update(serviceAccountResqpet);

//		Creamos usuarios de prueba donde el usuario 1 es el unico que tendrá el grupo providers
		List<String> groupList = new ArrayList<>();
//		groupList.add(GROUPS_VALUE);

		User adminUser = new User("","resqpet-admin", "Admin", "Admin", "", groupList);
		User clientUser = new User("","monterrosaf", "Felipe", "Monterrosa", "", new ArrayList<>());

		String idUser1 = users.createUser(adminUser, RESQPET_REALM);
		String idUser2 = users.createUser(clientUser, RESQPET_REALM);

		users.setPassword(idUser1, adminUser.getUsername(), usersResource);
		users.setPassword(idUser2, clientUser.getUsername(), usersResource);

		roles.setRole(CLIENT_ROLE, RESQPET_REALM, adminUser.getUsername(), resqpetClientId);
		roles.setRole(CLIENT_ROLE, RESQPET_REALM, clientUser.getUsername(), resqpetClientId);

		roles.setRole(ADMIN_ROLE, RESQPET_REALM, adminUser.getUsername(), resqpetClientId);

//		users.setGroup(idUser1,GROUPS_VALUE, realmResource, usersResource);

		System.out.println("Proceso finalizado de forma exitosa");
	}

}
