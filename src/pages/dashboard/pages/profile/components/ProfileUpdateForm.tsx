import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Endpoints } from "@/api/endpoints";
import { useEffect } from "react";
import { updateProfile } from "@/redux/slices/user/userProfileSlice";

type Inputs = {
  photo: FileList;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
};

export default function ProfileUpdateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const updateProfileMutation = useUpdateProfile();
  const { firstName, bio, lastName, photoUrl, username } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const dispatch = useDispatch();

  function onSubmit(data: Inputs) {
    if (data.photo[0]) {
      if (data.photo[0].size > 10000000) {
        setError("photo", {
          type: "manual",
          message: "Photo size must be less than 10MB.",
        });
        return;
      }
    }

    const formData = new FormData();

    formData.append("photo", data.photo[0]);
    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("bio", data.bio);
    formData.append("ownerId", localStorage.getItem("userId") as string);

    updateProfileMutation.mutate(formData);

    if (updateProfileMutation.isSuccess) {
      reset();
    }
  }

  useEffect(() => {
    if (updateProfileMutation.isSuccess) {
      reset();
      dispatch(updateProfile(updateProfileMutation.data!));
      updateProfileMutation.reset();
    }
  }, [dispatch, reset, updateProfileMutation]);

  return (
    <form
      className="mx-auto mt-5 flex flex-col space-y-2 md:w-1/2 md:space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="photo">Profile photo</Label>
        <div className="flex flex-col items-center gap-2 space-x-2 md:flex-row">
          <a href={Endpoints.GET_IMAGE(photoUrl || "")} target="_blank">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={Endpoints.GET_IMAGE(photoUrl || "")}
                alt={`${firstName} ${lastName} Profile photo`}
              />
              <AvatarFallback>{`${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`}</AvatarFallback>
            </Avatar>
          </a>
          <Input
            id="photo"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="cursor-pointer"
            {...register("photo", { required: false })}
          />
          {errors.photo && (
            <p className="text-sm text-destructive">{errors.photo.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="johndoe"
          autoComplete="off"
          required
          minLength={2}
          maxLength={30}
          defaultValue={username || undefined}
          {...register("username", {
            required: true,
            minLength: 2,
            maxLength: 30,
          })}
        />
        {errors.username && (
          <p className="text-sm text-destructive">
            Username is required and must be between 2-30 character.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="John"
            autoComplete="off"
            required
            minLength={2}
            maxLength={30}
            defaultValue={firstName || undefined}
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 30,
            })}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">
              First name is required and must be between 2-30 character.
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            maxLength={30}
            autoComplete="off"
            defaultValue={lastName || undefined}
            {...register("lastName", {
              required: false,
              maxLength: 30,
            })}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">
              Last name must be less than 30 character.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          maxLength={1500}
          autoComplete="off"
          defaultValue={bio || undefined}
          {...register("bio", {
            required: false,
            maxLength: 150,
          })}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">
            Bio must be less than 150 character.
          </p>
        )}
      </div>

      <Button type="submit">Update Profile</Button>
    </form>
  );
}
