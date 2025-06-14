"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAllUsers,
  deleteUser,
  promoteUser,
  demoteUser,
} from "@/store/admin/adminSlice";
import { formatDate } from "@/utils/formatDate";
import { Role } from "@/types";

const AllUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handlePromote = async (userId: string) => {
    try {
      await dispatch(promoteUser(userId)).unwrap();
    } catch (error) {
      console.error("Failed to promote user:", error);
    }
  };

  const handleDemote = async (userId: string) => {
    try {
      await dispatch(demoteUser(userId)).unwrap();
    } catch (error) {
      console.error("Failed to demote user:", error);
    }
  };

  return (
    <TabsContent value="users" className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Registered Users</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(fetchAllUsers())}
        >
          Refresh List
        </Button>
      </div>

      {loading === "loading" ? (
        <Card>
          <CardContent className="p-6 text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Loading users...</h3>
          </CardContent>
        </Card>
      ) : users.length > 0 ? (
        <div className="space-y-2">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {user.name} ({user.role})
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Registered on: <span>{formatDate(user.createdAt)}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                    {user.role === Role.ADMIN ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemote(user.id)}
                      >
                        Demote to User
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePromote(user.id)}
                      >
                        Promote to Admin
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              No users have been registered yet.
            </p>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
};

export default AllUsers;
