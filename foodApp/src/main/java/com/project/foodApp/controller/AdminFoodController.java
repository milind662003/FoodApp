package com.project.foodApp.controller;

import com.project.foodApp.model.Food;
import com.project.foodApp.model.Restaurant;
import com.project.foodApp.model.User;
import com.project.foodApp.request.CreateFoodRequest;
import com.project.foodApp.request.CreateRestaurantRequest;
import com.project.foodApp.response.MessageResponse;
import com.project.foodApp.service.FoodService;
import com.project.foodApp.service.RestaurantService;
import com.project.foodApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        foodService.deleteFood(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }


}

