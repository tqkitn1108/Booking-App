package com.cnpm.bookingbackend.bootstrap;

import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.repo.RoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

// Before creating a user, we must ensure the role exists in the database.
// Function executed at the application startup to create roles in the database if they don't exist.
//@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;


    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.loadRoles();
    }

    private void loadRoles() {
        ERole[] roleNames = new ERole[]{ERole.USER, ERole.HOTEL, ERole.ADMIN};
        Map<ERole, String> roleDescriptionMap = Map.of(
                ERole.USER, "Default user role",
                ERole.HOTEL, "Client role",
                ERole.ADMIN, "Administrator role"
        );

        Arrays.stream(roleNames).forEach((roleName) -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);

            optionalRole.ifPresentOrElse(System.out::println, () -> {
                Role roleToCreate = new Role();

                roleToCreate.setName(roleName);
                roleToCreate.setDescription(roleDescriptionMap.get(roleName));

                roleRepository.save(roleToCreate);
            });
        });
    }
}

