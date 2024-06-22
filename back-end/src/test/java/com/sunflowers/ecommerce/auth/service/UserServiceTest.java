package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.Role;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Incubating;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    /**
     * Initializes mock objects and a test user before each test.
     */
    @BeforeEach
    void SetUp(){
        MockitoAnnotations.initMocks(this);
        user = new User();

        user.setId(UUID.randomUUID());
        user.setEmail("test@gmail.com");
        user.setFirstName("Tester");
        user.setLastName("Test");
        user.setPassword("MyPassword123");
        user.setRole(Role.USER);
        user.setPhone("1000000000");

    }

    /**
     * Tests if getAllUsers method returns a list of users.
     * It mocks the UserRepository to return a predefined list of users and then
     * checks if the returned list is not null and contains the expected number of users.
     */
    @Test
    public void testGetAllUsers() {
        // Arrange: The behavior of the mock is configured to return a list of users
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));

        // Act: the method to be tested is called
        List<User> users = (List<User>) userService.getAllUsers();

        // Assert: the returned list is not null and contains the expected number of users
        assertNotNull(users);
        assertEquals(1, users.size());

    }

    /**
     * Tests if getUserByEmail method returns the correct user.
     * It mocks the UserRepository to return a specific user when searched by email and then
     * checks if the returned user is not null and matches the expected details.
     */
    @Test
    public void testGetUserByEmail() {
        // Arrange: The behavior of the mock is configured so that it returns a specific user when searching by email
        when(userRepository.findByEmail(any(String.class))).thenReturn(java.util.Optional.of(user));

        // Act: the method to be tested is called
        User user = userService.getUserByEmail("test@gmail.com");

        // Assert: the returned user is not null and matches the expected details
        assertNotNull(user);
        assertEquals(user.getFirstName(), "Tester");
        assertEquals(user.getLastName(), "Test");
    }
}
